export default function Input({placeholder,ref}:{placeholder:string,ref?:any}){
    return(    

            <input  ref={ref} className="px-4 py-2 m-2 rounded-md border-gray-300 border size-auto"  placeholder={placeholder}/>
    )
 }