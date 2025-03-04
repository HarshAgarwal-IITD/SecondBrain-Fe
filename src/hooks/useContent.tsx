import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from 'axios'
export default function useContent(){
    const [contents,setContent]= useState([]);
    const [username,setUsername]=useState();
 
    useEffect(() => 
        {
           if(!localStorage.getItem('token')){
            return;
           }
//@ts-ignore
          const response = axios.get(BACKEND_URL + '/api/v1/content', {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            }).then((response)=>{
               
                setContent(response.data.contents);
                setUsername(response.data.userDetails.username);
              
               

            });
        },[])
    
    return {contents,username}
}