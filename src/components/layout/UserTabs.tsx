"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function UserTabs({isAdmin}:any){
    const path= usePathname();

    return(
        <div className="flex gap-2 tabs justify-center">
                <Link className={path==='/profile'?'active':''} href={'/profile'}>Profile</Link>
                {!isAdmin &&(
                    <Link className={path==='/hospital'?'active':''} href={'/hospital'}>My Hospitals</Link>

                )}

                {isAdmin &&(
                    <>
                    <Link className={path==='/hospitals'?'active':''} href={'/hospitals'}>Hospitals</Link>
                    <Link className={path==='/hospitalpending'?'active':''} href={'/hospitalpending'}>Pending Hospitals</Link>
                    <Link className={path==='/users'?'active':''} href={'/users'}>Users</Link>
                    </>
                )}
            </div>
    );
}