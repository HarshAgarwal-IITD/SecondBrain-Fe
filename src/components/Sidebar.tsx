// import { SidebarItem } from "./SidebarItem"
// import DocumentIcon from "./icons/DocumentIcon"
// import LinkIcon from "./icons/LinkIcon"
// import TagIcon from "./icons/TagIcon"
// import TwitterIcon from "./icons/TwitterIcon"
// import YoutubeIcon from "./icons/YoutubeIcon"
// import BrainIcon from "./icons/brainIcon"

// export default function Sidebar({setSelector}:{setSelector:any}){
//     return(
//      <div className=" flex-1 float bg-white border-2 border-gray-200  ">
//         <div className="flex gap-2 p-2 items-center mb-8">
//             <BrainIcon></BrainIcon>    
//         <div className="text-2xl font-bold">Second Brain</div>
//         </div>
//         <SidebarItem icon={<DocumentIcon/>} onclick={()=>{setSelector('')}} text="All Docs"></SidebarItem>
//         <SidebarItem icon={<TwitterIcon/>} onclick={()=>{setSelector('twitter')}} text="Tweets"></SidebarItem>
//         <SidebarItem icon={<YoutubeIcon/>} onclick={()=>{setSelector('youtube')}} text="Videos"></SidebarItem>
//         <SidebarItem icon={<LinkIcon/>} text="Links"></SidebarItem>
//         <SidebarItem icon={<TagIcon/>} text="Tags"></SidebarItem>
//         <SidebarItem icon={<DocumentIcon/>} text="Documents"></SidebarItem>

//      </div>
//     )
// }
import { SidebarItem } from "./SidebarItem";
import DocumentIcon from "./icons/DocumentIcon";
import LinkIcon from "./icons/LinkIcon";
import TagIcon from "./icons/TagIcon";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import BrainIcon from "./icons/brainIcon";
//@ts-ignore
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
//@ts-ignore
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ setSelector }: { setSelector: any }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (selection: string) => {
    setSelector(selection);
    setOpen(false); // Close sidebar after selecting an item
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-2">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white border-r border-gray-200">
        <div className="flex gap-2 p-2 items-center mb-8">
          <BrainIcon />
          <div className="text-2xl font-bold">Second Brain</div>
        </div>
     
        <SidebarItem icon={<DocumentIcon />} onclick={() => handleSelect("")} text="All Docs" />
        <SidebarItem icon={<TwitterIcon />} onclick={() => handleSelect("twitter")} text="Tweets" />
        <SidebarItem icon={<YoutubeIcon />} onclick={() => handleSelect("youtube")} text="Videos" />
        <SidebarItem icon={<LinkIcon />}  text="Links" />
        <SidebarItem icon={<TagIcon />}  text="Tags" />
        <SidebarItem icon={<DocumentIcon />} text="Documents" />
      </SheetContent>
    </Sheet>
  );
}