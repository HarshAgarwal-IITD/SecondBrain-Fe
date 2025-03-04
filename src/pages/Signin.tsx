import Input from "../components/Input"
import Button from "../components/Button"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import BrainIcon from "../components/icons/brainIcon";

export default function Signin(){
    const [loading,setLoading]=useState(false);
    const usernameRef= useRef<HTMLInputElement>();
    const passRef= useRef<HTMLInputElement>();
    const [msg,setmsg]=useState("");
    const navigate = useNavigate();
    async  function signin(){
        const username = usernameRef.current?.value;
        const password = passRef.current?.value;
        setLoading(true);
        try{const response =await axios.post(BACKEND_URL + "/api/v1/signin",{
            username,password
        })
        setLoading(false);
        
        setmsg(response.data.msg);

        if(response.data.msg!=='signin success'){
            return;
        }
        
        
        const jwt= response.data.token;
        
        
        localStorage.setItem('token',jwt);
        
        navigate('/')
        
        
    }
        catch(e){
            setmsg('error signing in')
        }
        
        
    }
    return(
        <div className="h-screen w-screen bg-gray-300 flex justify-center">
            <div className="flex flex-col justify-center">
                 <div className="flex gap-2 p-2 items-center mb-2">
                        <Link to={"/"}><BrainIcon></BrainIcon>  </Link>   
                         <div className="text-2xl font-bold">Second Brain</div>
                         </div>
                <div className="bg-white flex flex-col p-4 rounded-md">
                   
                    <Input placeholder="username" ref={usernameRef}></Input>
                    <Input placeholder="password" ref={passRef} ></Input>
                    {msg && <div className="flex text-centre justify-center">{msg}</div>}
                    <Button variant="primary" type="textOnly" onClick={signin} text={`${loading ? 'signing in...':"Sign In"}`}></Button>
                    <Link className="text-bold flex justify-center underline text-black" to={"/signup"}>New here...?</Link>
                </div>
            </div>

        </div>
    )
}