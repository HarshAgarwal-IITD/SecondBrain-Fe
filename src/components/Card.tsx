import ShareIcon from "./icons/ShareIcon"
import TwitterIcon from "./icons/TwitterIcon"
import YoutubeIcon from "./icons/YoutubeIcon"
import DeleteIcon from "./icons/DeleteIcon"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import Button from "./Button"


interface cardTypes{
    title:string,
    link:string,
    type:'youtube' | 'twitter',
    id:string,
    refreshContent:()=>void

}


    


export default function Card({title,link,type,id,refreshContent}:cardTypes){
  const [embedLink, setEmbedLink] = useState(link); // State to store the modified link
  const navigate = useNavigate();

  useEffect(() => {
      if (type === "youtube") {
          const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([\w-]+)/;
          const match = link.match(regex);

          if (match && match[1]) {
              setEmbedLink(`https://www.youtube.com/embed/${match[1]}`);
          }
      }
  }, [link, type]); 
    async function deleteContent(){
        const response =await axios.delete(BACKEND_URL + "/api/v1/content",{
            headers:{
                authorization:localStorage.getItem('token')
            },
          data:{contentId:id,}  
        })
        refreshContent();
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
    <div className="bg-white min-w-80 p-4 m-3 rounded-md border border-slate-200 h-full min-h-100 ">
        <div className="justify-between flex items-center hover:cursor-pointer hover:underline" onClick={() => { window.open(link, '_blank')  }} >
            {type=="twitter"? <TwitterIcon />:""}
            {type=="youtube"? <YoutubeIcon/>:""}
        
             {title} 
             <div className="flex items-center  justify-between gap-2">
               
                <button className="p-1 hover:bg-gray-100 rounded-full" onClick={copyToClipboard}>
                <ShareIcon/>
                </button>
                <Dialog>
  <DialogTrigger>
    <button className="p-1 hover:bg-gray-100 rounded-full"><DeleteIcon/></button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your content
        and remove your data from our servers.
        <div className="flex justify-center mt-4"> 
          <div className="flex gap-3">
            <Button variant="secondary" onClick={deleteContent} text="Delete"></Button>
            <DialogClose asChild>
              <Button variant="primary" text="Cancel"></Button>
            </DialogClose>
          </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
 

                
                </div>
            
        </div>
        
        {type=="twitter" &&
        <blockquote className="twitter-tweet w-full ">
                <a href={link.replace('x','twitter')}></a>
                </blockquote>}


        {type=="youtube" &&
        <iframe className="w-full  pt-8" width="560" height="315" 
        src={embedLink} 
        title="YouTube video player" frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        } 
        </div>

    </>
}