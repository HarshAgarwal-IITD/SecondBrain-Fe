
import { ReactElement } from "react";

interface ButtonProps{
    variant:'primary'|'secondary',
    text:string,
    startIcon?:ReactElement,
    onClick?:()=>void,
    type?:'textOnly'|"iconOnly",
    loading?:boolean,
}
const variantStyle={
    "primary":"bg-indigo-500 text-white hover:bg-indigo-700",
    "secondary":"text-indigo-600 bg-indigo-200 hover:bg-indigo-100"
}
let defaultStyles="rounded-md flex px-4 py-2 m-2 cursor-pointer font-light gap-4 transition-all delay-100 justify-between "

export default function Button({variant,text,startIcon,onClick,type}:ButtonProps){
    if(type){
        defaultStyles=defaultStyles.replace('justify-between',' justify-center items-center ');
    }
    return <button onClick={onClick} className={`${variantStyle[variant]}  ${defaultStyles}`}>
       {startIcon} {text} </button>
}