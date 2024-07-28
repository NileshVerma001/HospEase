// pages/index.tsx
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Hospital } from '@/app/hospital/page';
import HospList from '@/components/layout/HospList';
import Map from '@/components/map';

export default function Home() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [highlightedHospitalId, setHighlightedHospitalId] = useState<number | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/hospital');
        setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleHospitalClick = (id: number) => {
    setHighlightedHospitalId(id);
  };

  return (
    <div className="container mx-auto px-4 flex">
      <div className="w-1/3 pr-4">
        <h1 className="text-3xl font-semibold mb-4">List of Hospitals</h1>
        <HospList hospitals={hospitals} onHospitalClick={handleHospitalClick} />
      </div>
      <div className="w-2/3 h-screen">
        <Map hospitals={hospitals} highlightedHospitalId={highlightedHospitalId} />
      </div>
    </div>
  );
}
