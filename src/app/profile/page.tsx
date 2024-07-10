"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import toast from "react-hot-toast";
import EditableImage from "@/components/layout/EdidableImage";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [userName, setUserName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await axios.get('/api/profile');
        if (response.status === 200) {
          const user = response.data;
          setUserName(user.name || '');
          setImage(user.image || '');
          setIsAdmin(user.admin || false); // Ensure this field is present in your session callback
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

  async function handleProfileInfoUpdate(ev: any) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put('/api/profile', {
          name: userName,
          image,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const updatedUser = response.data;
          await update(); // Refresh the session data
          setUserName(updatedUser.name);
          setImage(updatedUser.image);
        }

        resolve(undefined);
      } catch {
        reject();
      }
    });
    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Unable to save profile!',
    });
  }

  if (status === 'loading' || !profileFetched) {
    return 'Loading';
  }
  if (status === 'unauthenticated') {
    redirect('/login');
    return null; // To ensure nothing is rendered while redirecting
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}></UserTabs>
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-2 items-center">
          <div>
            <div className="p-2 rounded-lg relative">
              <EditableImage link={image} setLink={setImage} />
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              value={userName}
              placeholder="First and last name"
              onChange={ev => setUserName(ev.target.value)}
            />
            <input type="email" disabled value={session?.user?.email || ''} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
