import ShareIcon from "./icons/ShareIcon"
import TwitterIcon from "./icons/TwitterIcon"
import YoutubeIcon from "./icons/YoutubeIcon"
import DeleteIcon from "./icons/DeleteIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"

interface cardTypes{
    title:string,
    link:string,
    type:'youtube' | 'twitter',
    id:string

}


    


export default function Card({title,link,type,id}:cardTypes){
    async function deleteContent(){
        const response =await axios.delete(BACKEND_URL + "/api/v1/content",{
            headers:{
                authorization:localStorage.getItem('token')
            },
          data:{contentId:id,}  
        })
        console.log(response);
        

    }
    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(link);
          alert("Copied to clipboard!");
        } catch (error) {
          console.error("Failed to copy:", error);
        }
      };

    return <>
    <div className="bg-white  p-4 m-3 rounded-md border border-slate-200 h-full min-h-100 min-w-80">
        <div className="justify-between flex items-center">
            {type=="twitter"? <TwitterIcon/>:""}
            {type=="youtube"? <YoutubeIcon/>:""}
        
             {title} 
             <div className="flex justify-between gap-2">
               
                <button onClick={copyToClipboard}>
                <ShareIcon/>
                </button>
                <button onClick={deleteContent}><DeleteIcon/></button> 
                </div>
            
        </div>
        
        {type=="twitter" &&
        <blockquote className="twitter-tweet w-full ">
                <a href={link.replace('x','twitter')}></a>
                </blockquote>}


        {type=="youtube" &&
        <iframe className="w-full  pt-8" width="560" height="315" 
        src={link.replace('/watch?v=', '/embed/')} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        } 
        </div>

    </>
}