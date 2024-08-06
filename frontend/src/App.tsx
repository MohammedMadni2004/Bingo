import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [clicked, setClicked] = useState<boolean[][]>([]);
  const [isYourTurn, setIsYourTurn] = useState(true);

  useEffect(() => {
    handleReset();
  }, []);

  function handleReset() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    const final: number[][] = Array.from({ length: 5 }, (_, i) =>
      numbers.slice(i * 5, (i + 1) * 5)
    );
    setMatrix(final);
    setClicked(Array(5).fill(null).map(() => Array(5).fill(false)));
    setIsYourTurn(true);
  }

  function handleCellClick(row: number, col: number) {
    if (clicked[row][col]) return;

    setClicked(prev => {
      const newClicked = prev.map(r => [...r]);
      newClicked[row][col] = true;
      return newClicked;
    });
    setIsYourTurn(!isYourTurn);
  }

  const checkBingo = () => {
    if (clicked.length === 0) return false;
    
    // Check rows and columns
    for (let i = 0; i < 5; i++) {
      if (clicked[i].every(cell => cell) || clicked.every(row => row[i])) {
        return true;
      }
    }
    // Check diagonals
    if (clicked.every((row, i) => row[i]) || clicked.every((row, i) => row[4 - i])) {
      return true;
    }
    return false;
  };

  const bingo = checkBingo();

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
        {bingo ? "Bingo!" : (isYourTurn ? "Your Move" : "Other Person's Move")}
      </motion.h1>
      <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
        <div className="grid grid-cols-5 gap-4">
          {matrix.flat().map((item, index) => {
            const row = Math.floor(index / 5);
            const col = index % 5;
            return (
              <motion.div
                key={index}
                className={`${
                  clicked[row] && clicked[row][col]
                    ? "bg-[#FF4500] text-white"
                    : "bg-primary text-primary-foreground"
                } rounded-md flex items-center justify-center text-2xl font-bold w-16 h-16 cursor-pointer transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCellClick(row, col)}
              >
                {item}
              </motion.div>
            );
          })}
        </div>
      </div>
      <motion.button
        className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-secondary/90 transition-colors"
        onClick={handleReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Matrix
      </motion.button>
    </div>
  );
}

export default App;