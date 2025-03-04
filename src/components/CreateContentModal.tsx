 import CrossIcon from "./icons/CrossIcon";
 import Button from "./Button";
 import Input from "./Input";
 import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from 'axios'
enum Type{
    Youtube='youtube',
    Twitter = 'twitter',
    Document='document'
   

}
 export default function CreateContentModal({open,onClose}:{open:boolean ,onClose:()=>void}){
    //@ts-ignore
    const titleRef = useRef<HTMLInputElement>();
     //@ts-ignore
    const linkRef = useRef<HTMLInputElement>();
    const [type,setType]= useState<Type>();
    const [msg , setMsg] = useState();
    async function addContent(){
        const title = titleRef.current.value;
        const link = linkRef.current.value
        console.log(title,link)
        
        const response =await axios.post(BACKEND_URL+'/api/v1/content',{
            title,link,type
        },{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        setMsg(response.data.msg);
        onClose();

    }
    if(open)
    return (
        <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex justify-center ">
        <div className="flex flex-col  justify-center  ">
            <div className="bg-white rounded-md">
              
            <div className=" flex justify-between w-80  p-4">
            <h1 className="text-2xl font-bold">Add Content</h1>
            <button onClick={onClose}>
            <CrossIcon></CrossIcon>
            </button>
            
            </div>
            <div className="flex flex-col">
            <Input ref={titleRef} placeholder="title"></Input>
        
            <Input ref={linkRef} placeholder={`${type==='document'?'content':"link"}`}></Input>
            <h1 className=" text-xl items-center flex justify-center">Select Type :</h1>
            <div className="flex justify-evenly items-center">
            
            <Button variant={`${type === 'youtube'?'primary':'secondary'}`} text="Youtube" onClick={()=>setType(Type.Youtube)}></Button>
            <Button variant={`${type === 'twitter'?'primary':'secondary'}`} text="Twitter" onClick={()=>setType(Type.Twitter)}></Button>
            {/* <Button variant={`${type === 'document'?'primary':'secondary'}`} text="Document" onClick={()=>setType(Type.Document)}></Button> */}
            </div>
            {msg && <div className="flex text-centre justify-center">{msg}</div>}
            <div className="flex justify-center">
            <Button variant="primary" text="Submit" onClick={addContent}></Button>
            </div>
            
            
            

            </div>
            </div> 
            
        </div>
        </div>
    )
    else
    return null;

 }
 