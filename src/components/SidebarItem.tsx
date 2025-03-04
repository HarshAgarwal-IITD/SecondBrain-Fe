import { ReactElement } from "react";

export function SidebarItem({icon,text,onclick}:{icon:ReactElement, text:string,onclick?:()=>void}){
    return(
        <div onClick={onclick} className="flex gap-3 text-gray-600 m-2 p-2 pl-6 rounded-md transition-all delay-100 cursor-pointer hover:bg-gray-200">
            {icon} {text}
        </div>
    )
}