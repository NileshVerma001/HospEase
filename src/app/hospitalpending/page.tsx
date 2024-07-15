"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";

export default function PendingHospital() {
  const { data: session, status, update } = useSession();
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('/api/profile');
        if (response.status === 200) {
          const user = response.data;
          setUserName(user.name || '');
          setIsAdmin(user.admin || false);
          setProfileFetched(true);
        } else {
          console.error('Failed to fetch profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);


  if (status === 'loading' || !profileFetched) {
    return 'Loading';
  }
  if (status === 'unauthenticated') {
    redirect('/login');
    return null; 
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}></UserTabs>
      <div className="max-w-md mx-auto mt-8">
        
        
      </div>
    </section>
  );
}
