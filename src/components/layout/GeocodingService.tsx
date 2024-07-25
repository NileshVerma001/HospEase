// components/GeocodingService.tsx
"use client"
import { useEffect } from 'react';

export default function GeocodingService() {
  useEffect(() => {
    let map: google.maps.Map;
    let marker: google.maps.Marker;
    let geocoder: google.maps.Geocoder;
    let responseDiv: HTMLElement;
    let response: HTMLElement;

    const initMap = () => {
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        mapTypeControl: false,
      });

      geocoder = new google.maps.Geocoder();

      const inputText = document.createElement('input');
      inputText.type = 'text';
      inputText.placeholder = 'Enter a location';
      inputText.classList.add('bg-white', 'border', 'rounded', 'shadow', 'p-2', 'm-2');

      const submitButton = document.createElement('input');
      submitButton.type = 'button';
      submitButton.value = 'Geocode';
      submitButton.classList.add('bg-blue-500', 'text-white', 'rounded', 'shadow', 'p-2', 'm-2');

      const clearButton = document.createElement('input');
      clearButton.type = 'button';
      clearButton.value = 'Clear';
      clearButton.classList.add('bg-white', 'text-blue-500', 'rounded', 'shadow', 'p-2', 'm-2');

      response = document.createElement('pre');
      response.id = 'response';
      response.innerText = '';
      response.classList.add('bg-white', 'rounded', 'shadow', 'p-2', 'm-2', 'max-h-64', 'overflow-auto');

      responseDiv = document.createElement('div');
      responseDiv.id = 'response-container';
      responseDiv.appendChild(response);

      const instructionsElement = document.createElement('p');
      instructionsElement.id = 'instructions';
      instructionsElement.innerHTML = '<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.';
      instructionsElement.classList.add('bg-white', 'rounded', 'shadow', 'p-4', 'm-2');

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(instructionsElement);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);

      marker = new google.maps.Marker({ map });

      map.addListener('click', (e:any) => {
        geocode({ location: e.latLng });
      });

      submitButton.addEventListener('click', () => geocode({ address: inputText.value }));
      clearButton.addEventListener('click', clear);

      clear();
    };

    const clear = () => {
      marker.setMap(null);
    };

    const geocode = (request: google.maps.GeocoderRequest) => {
      clear();
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;
          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
          response.innerText = JSON.stringify(result, null, 2);
        })
        .catch((e) => {
          alert('Geocode was not successful for the following reason: ' + e);
        });
    };

    (window as any).initMap = initMap;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap&v=weekly`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      if (script) {
        script.remove();
      }
    };
  }, []);

  return <div id="map" className="h-screen"></div>;
}
