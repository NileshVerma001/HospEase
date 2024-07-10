"use client";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AddHospitalForm from "@/components/layout/AddHospitalForm"; // Adjust the import path as necessary

interface Hospital {
  id: string;
  verified: boolean;
  image: string;
  ownermail: string;
  name: string;
  latitude: number;
  longitude: number;
  streatadd: string;
  city: string;
  district: string;
  state: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function HospitalComponent() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [userHospital, setUserHospital] = useState<Hospital | null>(null);
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
        const userHospital = response.data.find((hospital: Hospital) => hospital.ownermail === usermail);
        setUserHospital(userHospital || null);
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
      const userHospital = hospitalList.find(hospital => hospital.ownermail === usermail);
      setUserHospital(userHospital || null);
    }
  }, [hospitalList, usermail]);

  const handleAddHospitalSuccess = (hospital: Hospital) => {
    setHospitalList([...hospitalList, hospital]);
    setShowForm(false);
  };

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      {hospitalList.map(hospital => (
        <div key={hospital.id}>
          <p>{hospital.name}</p>
        </div>
      ))}
      {userHospital && (
        <div>
          <h2>Your Hospital</h2>
          <p>{userHospital.name}</p>
        </div>
      )}
      <button onClick={() => setShowForm(!showForm)} className="mt-4 p-2 bg-blue-500 text-white rounded">
        {showForm ? 'Cancel' : 'Add New Hospital'}
      </button>
      {showForm && <AddHospitalForm onSuccess={handleAddHospitalSuccess} usermail={usermail} />}
    </section>
  );
}
