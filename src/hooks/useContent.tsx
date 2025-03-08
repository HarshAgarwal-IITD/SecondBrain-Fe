// import { useEffect, useState ,useCallback} from "react";
// import { BACKEND_URL } from "../config";
// import axios from 'axios'

// export default function useContent(){
//     const [contents,setContent]= useState([]);
//     const [username,setUsername]=useState();
//     const [reload,setReload]=useState(0);
//     const refresh = useCallback(() => {
//         console.log('in reload')
//         setReload(prev => prev + 1);
//     }, []);
   

//     useEffect(() => 
//         { 
//             console.log('in use content')
//            if(!localStorage.getItem('token')){
//             return;
//            }
// //@ts-ignore
//           const response = axios.get(BACKEND_URL + '/api/v1/content', {
//                 headers: {
//                     authorization: localStorage.getItem('token')
//                 }
//             }).then((response)=>{
               
//                 setContent(response.data.contents);
//                 setUsername(response.data.userDetails.username);
              
               

//             });
//         },[reload])
    
//     return {contents,username,refresh}
// }

import { useEffect, useState, useCallback } from "react";
import { BACKEND_URL } from "../config";
import axios from 'axios';

export default function useContent() {
  const [contents, setContent] = useState([]);
  const [username, setUsername] = useState('');
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const refresh = useCallback(() => {
    console.log('in refresh');
    setReload(prev => prev + 1);
  }, []);
  
  useEffect(() => {
    console.log('in use content');
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }
    
    setLoading(true);
    
    axios.get(BACKEND_URL + '/api/v1/content', {
      headers: {
        authorization: token
      }
    })
    .then((response) => {
      
      console.log('Data fetched successfully', response.data);
      setContent(response.data.contents);
      setUsername(response.data.userDetails.username);
      console.log('content changed', response.data);
    })
    .catch((error) => {
      console.error('Error fetching content:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [reload]);
  
  return { contents, username, refresh, loading };
}