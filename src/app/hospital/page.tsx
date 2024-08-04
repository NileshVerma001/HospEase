"use client";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddHospitalForm from "@/components/layout/AddHospitalForm"; // Adjust the import path as necessary
import HospitalCard from "@/components/layout/HospitalCard"; // Adjust the import path as necessary

export interface Hospital {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  district: string;
  state: string;
  avgBedPrice: number;
  totalBeds: number;
  bedsAvailable: number;
  doc: string;
  verified: boolean;
  ownerMail: string;
  phoneNumber: string;
  specialties: string[];
}


export default function HospitalComponent() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [userHospitals, setUserHospitals] = useState<Hospital[]>([]);
  const [usermail, setUsermail] = useState<string | null | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchHospitals();
  }, []);

  async function fetchHospitals() {
    try {
      const response = await axios.get('/api/hospital');
      setHospitalList(response.data);

      if (usermail) {
        const userHospitals = response.data.filter((hospital: Hospital) => hospital.ownerMail === usermail);
        setUserHospitals(userHospitals);
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  }

  useEffect(() => {
    setIsAdmin(session?.user?.admin || false);
    setUsermail(session?.user?.email);
  }, [session]);

  useEffect(() => {
    if (usermail) {
      const userHospitals = hospitalList.filter(hospital => hospital.ownerMail === usermail);
      setUserHospitals(userHospitals);
    }
  }, [hospitalList, usermail]);

  const handleAddHospitalSuccess = (hospital: Hospital) => {
    setHospitalList([...hospitalList, hospital]);
    setShowForm(false);
  };

  const handleEditHospital = (id: number, data: { bedsAvailable: number; totalBeds: number; avgBedPrice: number }) => {
    const updatedHospitals = hospitalList.map(hospital =>
      hospital.id === id ? { ...hospital, ...data } : hospital
    );
    setHospitalList(updatedHospitals);
    const updatedUserHospitals = userHospitals.map(hospital =>
      hospital.id === id ? { ...hospital, ...data } : hospital
    );
    setUserHospitals(updatedUserHospitals);
  };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        {userHospitals.map(hospital => (
          <HospitalCard key={hospital.id} hospital={hospital} onEdit={handleEditHospital} />
        ))}
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Hospital'}
        </button>
        {showForm && <AddHospitalForm onSuccess={handleAddHospitalSuccess} usermail={usermail} />}
      </div>
    </section>
  );
}
