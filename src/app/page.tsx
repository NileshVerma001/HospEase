"use client"
import HospList from "@/components/layout/HospList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Hospital } from "./hospital/page";
import Map from "@/components/map";

// interface Hospital {
//   id: number;
//   name: string;
//   latitude: number;
//   longitude: number;
//   bedsAvailable: number;
//   avgBedPrice: number;
//   address: string;
//   phoneNumber: string;
//   totalBeds: number;
// }

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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-semibold mb-4">List of Hospitals</h1>
      <HospList hospitals={hospitals} onHospitalClick={handleHospitalClick} />
      <br />
      <br />
      <Map hospitals={hospitals} highlightedHospitalId={highlightedHospitalId} />
      <br />
      <br />
    </div>
  );
}
