"use client"
import { useState } from 'react';
import { useLocation } from '../menue/LocationContext';
import { Hospital } from '@/app/hospital/page';

// interface Hospital {
//   id: number;
//   name: string;
//   bedsAvailable: number;
//   avgBedPrice: number;
//   latitude: number;
//   longitude: number;
//   address: string;
//   phoneNumber: string;
//   totalBeds: number;
//   // Add more details as needed
// }

interface HospListProps {
  hospitals: Hospital[];
  onHospitalClick: (id: number) => void;
}

const HospList: React.FC<HospListProps> = ({ hospitals, onHospitalClick }) => {
  const { location } = useLocation(); // Retrieve location data from context
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null);

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat2: number, lon2: number) => {
    const lat1 = location.latitude || 0; // Use latitude from context
    const lon1 = location.longitude || 0; // Use longitude from context
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2); // Distance in km, rounded to 2 decimal places
  };

  // Function to toggle expanded view of a hospital card
  const toggleExpanded = (id: number) => {
    setExpandedHospital(expandedHospital === id ? null : id);
  };

  // Function to sort hospitals by distance
  const sortHospitalsByDistance = () => {
    const sortedHospitals = [...hospitals].sort((a, b) => {
      const distanceA = calculateDistance(a.latitude, a.longitude);
      const distanceB = calculateDistance(b.latitude, b.longitude);
      return parseFloat(distanceA) - parseFloat(distanceB);
    });

    return sortedHospitals;
  };

  const sortedHospitals = sortHospitalsByDistance();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {sortedHospitals.map((hospital) => (
        <div
          key={hospital.id}
          className="border rounded-lg p-4 shadow-md cursor-pointer"
          onClick={() => onHospitalClick(hospital.id)}
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">{hospital.name}</h2>
            <button
              onClick={() => toggleExpanded(hospital.id)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {expandedHospital === hospital.id ? '▲' : '▼'}
            </button>
          </div>
          {expandedHospital === hospital.id && (
            <div className="mt-2">
              <p><strong>Hospital Number:</strong> {hospital.phoneNumber}</p>
              <p><strong>Address:</strong> {hospital.address}</p>
              <p><strong>Total Beds:</strong> {hospital.totalBeds}</p>
              {/* Add more details as needed */}
            </div>
          )}
          <div className="mt-4">
            <p><strong>Beds Available:</strong> {hospital.bedsAvailable}</p>
            <p><strong>Avg Bed Price:</strong> ${hospital.avgBedPrice}</p>
            <p><strong>Distance:</strong> {calculateDistance(hospital.latitude, hospital.longitude)} km</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HospList;
