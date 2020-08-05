 import React ,{useState, useEffect} from 'react';
 import queryString from 'query-string'; // retrival of data from url
 import io from 'socket.io-client';
 import InfoBar from '../InfoBar/InfoBar';
 import Input from '../Input/Input';
 import Messages from '../messages/Messages'
 import './Chat.css';

 let socket;

 const Chat =({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const[users, setUsers] =useState([]);
    const ENDPOINT = 'localhost:5000';

     useEffect (() => {
         const {name,room} = queryString.parse(location.search); //loaction from react router so we get a url back
    
         socket = io(ENDPOINT);

         setRoom(room);
         setName(name);

         socket.emit('join', { name, room }, (error) => {
            if(error) {
              alert(error);
            }
          });
        }, [ENDPOINT, location.search]);
        
        useEffect(() => {
          socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
          });
          
          socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
      }, []);
       // run only when messages array changes

        // function of sending messages
        const sendMessage = (event) => {
            event.preventDefault();
        
            if(message) {
              socket.emit('sendMessage', message, () => setMessage(''));
            }
          }

        console.log(message, messages);

        return (
            <div className="outerContainer">
              <div className="container">
                  <InfoBar room={room} />
                  <Messages messages={messages} name={name} />
                  <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
              
            </div>
          );
        }
  
export default Chat