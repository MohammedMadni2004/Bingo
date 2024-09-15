import { useState, useEffect } from "react";
import {setMatrix} from './functionality'
import MatrixComponent from './components/matrix'
import Loader from './components/loader'

function App() {
  const [message,setMessage]=useState<string[]>([]);
  const [socket,setSocket]=useState <null| WebSocket>(null);
  let matrix: number[][] = [];
  console.log(message);

 useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onmessage=(event) => {
      console.log('recieved data ',event.data);
      console.log(typeof(event.data));
      setMessage((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        return newMessages;
        });
      };
   return () => {
    socket.close();
  };
},[])
 if(!socket){
     return(
       <>no socket </>
     );
   }
  if(message.length===1){
    return(
      <>
      <Loader />
      <div>waiting for other player to connect</div>
      </>
     )
  }
  else if(message.length===2){ 
    return (
    <>
        
        <button onClick={()=>{
          console.log(message[0]);
          console.log(message[1]);
          socket.send(JSON.stringify({
            'id': message[0],
            'type':'init'
          }));
          console.log(message);
          
        }}>start game</button>
        <h1>{message}</h1>
       
      </>
  )}
  else if(message.length==3){
  let len=message.length;
  if(message[len-1]=='waiting for other player to start'){
    console.log('if called',len);
    return (
      <>
      <Loader />
      <h1>wait</h1>
      </>
    )
    
    
}
else{
  console.log('called ');
  setMessage((prevMessage)=>[...prevMessage,'1']);
  
   }
}
else if(message.length>=4){
  console.log(typeof message[3]);
  
   matrix=setMatrix(message);
   return(
   <MatrixComponent socket={socket} message={message} two_matrix={matrix}/>
   )
}
  
}

export default App;