import React, { useState, useEffect } from "react";
import { motion, type } from "framer-motion";
import {setMatrix} from './functionality'
import MatrixComponent from './components/matrix'

import { string } from "prop-types";
//so for managing the messages ive used arrays and appended all the previous messages now we can send request to socket server based on that array
function App() {
  const [message,setMessage]=useState([]);
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
  // return (
  //   <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
  //     <motion.h1 
  //       className="text-4xl md:text-6xl font-bold mb-8 text-primary"
  //       style={{
  //         fontFamily: "'Brush Script MT', cursive",
  //         textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  //       }}
  //       initial={{ opacity: 0, y: -50 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //     </motion.h1>
  //     <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
  //       <div className="grid grid-cols-5 gap-4">
  //         {matrix.flat().map((item, index) => {
  //           const row = Math.floor(index / 5);
  //           const col = index % 5;
  //           return (
  //             <motion.div
  //               key={index}
  //               className={`${
  //                 clicked[row] && clicked[row][col]
  //                   ? "bg-[#FF4500] text-white"
  //                   : "bg-primary text-primary-foreground"
  //               } rounded-md flex items-center justify-center text-2xl font-bold w-16 h-16 cursor-pointer transition-colors`}
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //               onClick={() => handleCellClick(row, col)}
  //             >
  //               {item}
  //             </motion.div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     <motion.button
  //       className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-colors"
  //       // onClick={handleReset}
  //       whileHover={{ scale: 1.05 }}
  //       whileTap={{ scale: 0.95 }}
  //     >
  //       Reset Matrix
  //     </motion.button>
  //     <h1>{message}</h1>
      
  //  </div>
  // );
  if(message.length===1){
    return(
      <h1>waiting for other player</h1>
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
  else if(message.length>=3){
  //u will get matrix which is message[2] in string convert this to 1d array and then do styling
   matrix=setMatrix(message);
}
   return (
    <MatrixComponent two_matrix={matrix}/>
     
   )
 
}

export default App;