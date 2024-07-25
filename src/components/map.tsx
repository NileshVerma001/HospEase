// components/Map.tsx
"use client";
import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Hospital } from '@/app/hospital/page';


interface MapProps {
  hospitals: Hospital[];
  highlightedHospitalId: number | null;
  userLocation: { lat: number; lng: number } | null;
}

const Map: React.FC<MapProps> = ({ hospitals, highlightedHospitalId }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 20.5937, lng: 78.9629 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude, 
        });
      });
    }
  }, []);

  const highlightedHospital = hospitals.find(h => h.id === highlightedHospitalId);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'bhabh';

  if (!apiKey) {
    return <div>Error: Google Maps API key is not set</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={highlightedHospital ? { lat: highlightedHospital.latitude, lng: highlightedHospital.longitude } : currentLocation}
        zoom={highlightedHospital ? 15 : 12}
      >
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={{ lat: hospital.latitude, lng: hospital.longitude }}
            icon={highlightedHospitalId === hospital.id ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : undefined}
          />
        ))}
        <Marker position={currentLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
