"use client"
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function LoginPage(){

    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginInProgress, setLoginInProgress]=useState(false);

    async function handleFormSubmit(ev:any){

        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials',{email,password, callbackUrl:'/'});
        setLoginInProgress(false);

    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
                <input disabled={loginInProgress} name="email"type="email" placeholder="Email" value={email} onChange={ev=> setEmail(ev.target.value)}></input>
                <input disabled={loginInProgress} name="password" type="password" placeholder="Password" value={password} onChange={ev=> setPassword(ev.target.value)}></input>
                <button disabled={loginInProgress} type="submit" >Login</button>
                <div className="my-4 text-center text-gray-500">
                    
                    or login with provider
                </div>
                <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="" width={24} height={24}/>
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t py-4">
                    Don't have an account? <Link className="underline" href={'/register'}>Register here</Link>
                </div>
            </form>
        </section>
    );
}