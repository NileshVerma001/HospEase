"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocationSelect from "../LocationSelect";
import { useLocation } from "../menue/LocationContext";
import Image from "next/image";

export default function Header() {
    const { location: curr } = useLocation();
  
    useEffect(() => {
      console.log(curr);
    }, [curr]);
  
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name;

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  const [location, setLocation] = useState("");

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
  };

  return (
    <>
      <header className="flex items-center justify-between" >
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">

        {/* <Image src="/logo1.png" alt="logo" width={50} height={50} className="object-contain" /> */}
          <Link className="text-primary font-semibold text-2xl" href="/">
            HospEase
          </Link>
          <LocationSelect onLocationChange={handleLocationChange} />
          <Link href="/">Home</Link>
          <Link href="/about">About</Link> {/* Updated this line */}
          <Link href="">Contact</Link>
        </nav>

        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          {status === "authenticated" && (
            <>
              <Link href="/profile" className="whitespace-nowrap">Hello, {userName}</Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                LogOut
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Register Hospital
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
