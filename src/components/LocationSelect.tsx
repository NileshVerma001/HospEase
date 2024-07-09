import { useState, useEffect } from 'react';
import { useLocation } from './menue/LocationContext';

interface LocationSelectProps {
  onLocationChange: (location: string) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ onLocationChange }) => {
  const { setLocation } = useLocation();
  const [location, setLocationState] = useState("Select Location");

  const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocation = event.target.value;

    if (selectedLocation === "current") {
      fetchCurrentLocation();
    } else {
      setLocationState(selectedLocation);
      updateLocation(selectedLocation);
    }
  };

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = `Lat: ${latitude}, Lon: ${longitude}`;
        setLocationState(currentLocation);
        setLocation({ latitude, longitude });
        onLocationChange(currentLocation);
      });
    }
  };

  const updateLocation = (selectedLocation: string) => {
    let lat = 0, long = 0;
    switch (selectedLocation) {
      case 'City1':
        lat = 12.9716; long = 77.5946;
        break;
      case 'City2':
        lat = 19.0760; long = 72.8777;
        break;
      case 'City3':
        lat = 28.7041; long = 77.1025;
        break;
      default:
        lat = 0; long = 0;
    }
    setLocation({ latitude: lat, longitude: long });
    onLocationChange(selectedLocation);
  };

  useEffect(() => {
    fetchCurrentLocation(); // Fetch current location on component mount

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on component mount

  return (
    <select
      value={location}
      onChange={handleLocationChange}
      className="bg-white border border-gray-300 rounded-md p-2"
    >
      <option value="Select Location" disabled>Select Location</option>
      <option value="current">Current Location</option>
      <option value="City1">City1</option>
      <option value="City2">City2</option>
      <option value="City3">City3</option>
    </select>
  );
};

export default LocationSelect;
