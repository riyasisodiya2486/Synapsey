import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg1 from "../assets/bg4.jpg"

export function Signup(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try{
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password          
            })
            navigate("/signin")
            alert("you have signed up")

        }catch(err){
            console.log(err)
        }
    }

    return <div className="h-screen w-full flex flex-col sm:flex-row bg-gradient-to-r from-[#111432] via-[#1b2a51] to-[#111431]">
            <div className="sm:w-1/2 w-full h-1/2 sm:h-full">
                <img
                className="w-full h-full object-cover rounded-none sm:rounded-r-3xl"
                src={bg1}
                alt="Background"
                />
            </div>
            
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
                    onClick={signup}
                    variant="primary"
                    text="Sign up"
                    loading={false}
                    fullWidth={true}
                    />
                </div>
                <div>
                    <p>
                        Already have an account?  
                        <a href="/signin" className="text-blue-400"> Sign in</a>
                    </p>
                </div>
                </div>
            </div>
        </div>

}