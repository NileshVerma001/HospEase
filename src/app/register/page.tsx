"use client"
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function RegisterPage(){
    const [email, setEmail]=useState('');
    const [name, setName]=useState('');
    
    const [password,setPassword]=useState('');
    const [userCreated,setUserCreated]=useState(false);
    const [creatingUser, setCreatingUser]=useState(false);
    const [error,setError]=useState(false);

    async function handleFormSubmit(ev:any) {
        ev.preventDefault();
        setCreatingUser(true);
        try{
            await axios.post('/api/register',{
                name,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setUserCreated(true);
            setCreatingUser(false);
        } catch(e){
            setError(true);
            setCreatingUser(false);
        }
        
    }
    

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User Created. Now you can <Link className="underline" href={'/login'}>Login</Link>
                </div>
            )}

            {error && (
                <div className="my-4 text-center">An error has occured. Please try again later</div>
            )}
            <form className="block max-w-xs mx-auto " onSubmit={handleFormSubmit}>
                 <input disabled={creatingUser} type="text" placeholder="Name" value={name} onChange={ev=> setName(ev.target.value)}></input>
                <input disabled={creatingUser} type="email" placeholder="Email" value={email} onChange={ev=> setEmail(ev.target.value)}></input>
                <input disabled={creatingUser} type="password" placeholder="Password" value={password} onChange={ev=> setPassword(ev.target.value)}></input>
                <button disabled={creatingUser} type="submit" >Register</button>
                <div className="my-4 text-center text-gray-500">
                    
                    or login with provider
                </div>
                <button onClick={()=>signIn('google',{callbackUrl:'/'})}  className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="" width={24} height={24}/>
                    Login with google
                </button>
                <div className="text-center my-4 text-gray-500 border-t py-4">
                    Existing account? <Link className="underline" href={'/login'}>Login here</Link>
                </div>
            </form>

        </section>
    );
}