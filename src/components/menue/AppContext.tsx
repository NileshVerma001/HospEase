"use client"
import { SessionProvider } from "next-auth/react";

export default function AppProvider({children}:any){
    return(
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}