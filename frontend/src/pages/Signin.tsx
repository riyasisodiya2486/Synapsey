import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useRef } from "react";
import { BACKEND_URL } from "./config";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import bg2 from "../assets/bg2.jpg";


export function Signin(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password          
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        navigate("/dashboard")
        
    }

    return <div className="h-screen font-neue w-full flex flex-col sm:flex-row bg-gradient-to-r from-[#111432] via-[#1b2a51] to-[#111431]">     
            <div className="sm:w-1/2 w-full h-1/2 sm:h-full flex items-center justify-center px-6">
                <div className="text-white text-center w-full max-w-md space-y-6">
                <h1 className="font-neue text-4xl font-bold">Welcome to the Second Brain</h1>
                <p className="text-gray-300">
                    Save links from anywhere. Ask smart questions. Let your digital mind respond.
                </p>
                <div className="space-y-4">
                    <Input reference={usernameRef} placeholder="Username" />
                    <Input reference={passwordRef} placeholder="Password" />
                    <Button
                    onClick={signin}
                    variant="primary"
                    text="Sign in"
                    loading={false}
                    fullWidth={true}
                    />
                </div>
                <div>
                    <p>
                        Don't have an account?  
                        <a href="/signup" className="text-blue-400 font-bold"> Sign up</a>
                    </p>
                </div>
                </div>
            </div>

            <div className="sm:w-1/2 w-full h-1/2 sm:h-full">
                <img
                className="w-full h-full object-cover rounded-none sm:rounded-r-3xl"
                src={bg2}
                alt="Background"
                />
            </div>
        </div>
}