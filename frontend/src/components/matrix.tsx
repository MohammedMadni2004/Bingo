import React from 'react';
import { motion } from 'framer-motion';

type MatrixProps = {
  two_matrix: number[][];
  socket:WebSocket;
  mesage:string[]
}

const MatrixComponent: React.FC<MatrixProps> = ({ two_matrix,socket,mesage }) => {
  function handleMove(event){
     let n=event.target.innerText;
     socket.send(JSON.stringify({
      'id': mesage[0],
      'type':"move",
      'n':n
    }));
    event.target.style="background-color:red";
    }
    function handleWin(event){
      socket.send(JSON.stringify({
        'id':mesage[0],
        'type':'bingo'
      }))
    }
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
      {/* Header (Optional) */}
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

      {/* Matrix Grid */}
      <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
        <div className="grid grid-cols-5 gap-4">
          {two_matrix.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold w-16 h-16 cursor-default transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMove}
              >
                {item}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <button onClick={handleWin}>BINGO WINNER</button>
      <h1>{mesage[mesage.length-1]}</h1>
    </div>
  );
};

export default MatrixComponent;
