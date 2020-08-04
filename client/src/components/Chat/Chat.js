 import React ,{useState, useEffect} from 'react';
 import queryString from 'query-string'; // retrival of data from url
 import io from 'socket.io-client'

 let socket;

 const Chat =({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

     useEffect (() => {
         const {name,room} = queryString.parse(location.search); //loaction from react router so we get a url back
    
         socket = io(ENDPOINT);

         setRoom(room);
         setName(name);

        })
     return (
         <div>
             <h1>CHAT</h1>
         </div>
     )
 }
  
export default Chat