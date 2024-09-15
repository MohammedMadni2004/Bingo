import { motion } from 'framer-motion';
import React from "react";
import GameComponent from './isPlay'
type MatrixProps = {
  two_matrix: number[][];
  socket:WebSocket;
  message:string[]
}

const MatrixComponent: React.FC<MatrixProps> = ({ two_matrix,socket, message }) => {
  console.log('happened');
  
  function handleMove(event:React.MouseEvent):void{
    const target = event.target as HTMLElement;
    let n = target.innerText;
    socket.send(JSON.stringify({
      'id': message[0],
      'type': "move",
      'n': n
    }));
  
      target.classList.add(
      "bg-gradient-to-r", "from-red-500", "via-red-600", "to-red-700",  
      "text-white", "shadow-xl", "transform", "scale-105", "transition-all", 
      "duration-500", "ease-in-out", "ring-4", "ring-offset-2", "ring-red-300" 
    );
    target.style.pointerEvents='none';

  
    
  }
    function handlPress(message:string){
     
      let n = parseInt(message.split(' ')[1]);
      const targetDiv = document.querySelector(`[data-value="${n}"]`);
      targetDiv.style.pointerEvents='auto';
      console.log(targetDiv.style.pointerEvents);
      
    }
    function getPointerEvent(message){
      if (message[message.length - 1] === 'false') return 'none';
      if(message[message.length-2].includes('press')) return 'none';
      else{
        return 'auto';
      }
    }
    function handleWin(){
      socket.send(JSON.stringify({
        'id':message[0],
        'type':'bingo'
      }));
    }
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold mb-8 text-primary"
        style={{
          fontFamily: "'Brush Script MT', cursive",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bingo
      </motion.h1>
      {(message[message.length-1]=='invalid req')?(message.pop(),<h1>invalid req</h1>):<h1>{message[message.length-1]}</h1>}
      {(message[message.length-1]=='false')?<GameComponent />:null}

      <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
        <div className="grid grid-cols-5 gap-4" 
        style={{ pointerEvents: getPointerEvent(message) }} >
          {two_matrix.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold w-16 h-16 cursor-default transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-value={item}
                onClick={handleMove}
                > 
                {item}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <motion.button onClick={handleWin}>BINGO WINNER</motion.button>

      {message[message.length-2].includes('press')?(handlPress(message[message.length-2]),<h1>{message[message.length-2]}</h1>):null}
    </div>
  );
};

export default MatrixComponent;
