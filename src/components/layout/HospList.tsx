"use client";
import { useState } from 'react';
import { useLocation } from '../menue/LocationContext';
import { Hospital } from '@/app/hospital/page';

interface HospListProps {
  hospitals: Hospital[];
  onHospitalClick: (id: number) => void;
}

const HospList: React.FC<HospListProps> = ({ hospitals, onHospitalClick }) => {
  const { location } = useLocation(); // Retrieve location data from context
  const [expandedHospital, setExpandedHospital] = useState<number | null>(null);

  // Function to calculate distance between two coordinates using the Haversine formula
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
    <div className="space-y-6">
      {sortedHospitals.map((hospital) => (
        <div
          key={hospital.id}
          className={`border rounded-lg p-6 shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${expandedHospital === hospital.id ? 'bg-blue-50' : 'bg-white'
            }`}
          onClick={() => onHospitalClick(hospital.id)}
        >
          <div className="flex items-start mb-4">
            <img src={hospital.image} alt={hospital.name} className="w-20 h-20 rounded-lg mr-6 shadow-md" />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{hospital.name}</h2>
              <p className="text-sm text-gray-700 mb-1">{hospital.address}, {hospital.city}, {hospital.district}, {hospital.state}</p>
              <p className="text-sm text-gray-700 mb-1">Phone: {hospital.phoneNumber}</p>
              <p className="text-sm text-gray-700 mb-1">Avg Bed Price: Rs.{hospital.avgBedPrice}</p>
              <p className="text-sm text-gray-700 mb-1">Total Beds: {hospital.totalBeds}</p>
              <p className="text-sm text-gray-700 mb-1">Beds Available: {hospital.bedsAvailable}</p>
              <p className="text-sm text-gray-700 mb-1">Distance: {calculateDistance(hospital.latitude, hospital.longitude)} km</p>
              {hospital.verified && (
                <p className="text-sm text-green-600 font-semibold">Verified</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent onClick from triggering
                toggleExpanded(hospital.id);
              }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              {expandedHospital === hospital.id ? '▲' : '▼'}
            </button>
          </div>
          {expandedHospital === hospital.id && (
            <div className="mt-4 text-sm text-gray-600">
              <p className="text-gray-800 font-semibold mb-2">Specialties:</p>
              <ul className="list-disc list-inside text-gray-700 mb-2">
                {hospital.specialties.map((specialty, index) => (
                  <li key={index}>{specialty}</li>
                ))}
              </ul>
              <p><strong className="text-gray-800">Owner Email:</strong> {hospital.ownerMail}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HospList;
