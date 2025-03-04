import { SidebarItem } from "./SidebarItem"
import DocumentIcon from "./icons/DocumentIcon"
import LinkIcon from "./icons/LinkIcon"
import TagIcon from "./icons/TagIcon"
import TwitterIcon from "./icons/TwitterIcon"
import YoutubeIcon from "./icons/YoutubeIcon"
import BrainIcon from "./icons/brainIcon"

export default function Sidebar({setSelector}:{setSelector:any}){
    return(
     <div className=" flex-1 float bg-white border-2 border-gray-200  ">
        <div className="flex gap-2 p-2 items-center mb-8">
            <BrainIcon></BrainIcon>    
        <div className="text-2xl font-bold">Second Brain</div>
        </div>
        <SidebarItem icon={<DocumentIcon/>} onclick={()=>{setSelector('')}} text="All Docs"></SidebarItem>
        <SidebarItem icon={<TwitterIcon/>} onclick={()=>{setSelector('twitter')}} text="Tweets"></SidebarItem>
        <SidebarItem icon={<YoutubeIcon/>} onclick={()=>{setSelector('youtube')}} text="Videos"></SidebarItem>
        <SidebarItem icon={<LinkIcon/>} text="Links"></SidebarItem>
        <SidebarItem icon={<TagIcon/>} text="Tags"></SidebarItem>
        <SidebarItem icon={<DocumentIcon/>} text="Documents"></SidebarItem>

     </div>
    )
}