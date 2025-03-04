
import Button from "../components/Button"
import PlusIcon from "../components/icons/PlusIcon"
import ShareIcon from "../components/icons/ShareIcon"
import Card from "../components/Card"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from "react"
import CreateContentModal from "../components/CreateContentModal"
import useContent from "../hooks/useContent"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios from "axios"


export default function Dashboard(){

  const navigate =useNavigate();
  const [open,setOpen]=useState(false);
  const [login,setLogin]=useState(false);
  const [selector,setSelector]=useState("");
  const [shareLink,setShareLink]=useState("")
  async function shareBrain(){
    try{const response =await axios.post(BACKEND_URL+'/api/v1/brain/share',{
      share:true,
      
    },
    {
      headers:{
          authorization:localStorage.getItem('token')
      }
  }
  
  )
    console.log(response)
    setShareLink(response.data.hash);
    alert(  BACKEND_URL+"/api/v1/brain/:"+ shareLink);
  }catch(e){
    alert('error  ' + e);
  }
    
  }

  useEffect(()=>{
    if(localStorage.getItem('token'))
      setLogin(true);
  })
  const {contents,username}= useContent();
  function handleLogin(){
    localStorage.removeItem('token');
    setLogin(false);
  }
  
  
   
  return(<div className="flex gap-4  bg-gray-100 h-min-screen w-min-screen">
      <Sidebar setSelector={setSelector} />
  <div className="flex-4  bg-gray-100">

    <div className=" flex justify-between ">
    {open&& <CreateContentModal open={open} onClose={()=>setOpen(false)}/>}
        <div className="flex align-middle text-center items-center">
       {!login &&<Button variant="primary"  onClick={()=>navigate('/signin')} text="Sign In" ></Button>}
       {login && <Button variant="primary" onClick={handleLogin} text="SignOut"></Button>
       
         }
         {login &&  <div className="text-2xl font-bold text-indigo-800"> Hello {username}</div>}
      
        </div>
        <div className="flex ">
        
        <Button variant="primary" onClick={()=>{setOpen(true)}} text="Add Content" startIcon={<PlusIcon/>}></Button>
        <Button variant="secondary" text="Share Brain" onClick={shareBrain} startIcon={<ShareIcon/>}></Button>
        </div>
    </div>
    
      <div className="flex flex-wrap">
        
        {login&&  contents.map(({type,link,title,_id})=>
            ( (selector == "" || selector==type) ? <Card title={title} key={_id} link={link} type={type} id={_id} ></Card>:"")
        )}
        {login&& 
        contents.length===0 ?
        <div className="text-2xl font-bold">please add content</div>:""
        }
      
        {!login&& 
          <div className="text-2xl font-bold">please login to view content</div>
        }
      
      
          
        
      
      </div>
        </div>
    </div>
  )
}
