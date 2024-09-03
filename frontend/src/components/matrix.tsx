import React from 'react';
import { motion } from 'framer-motion';

interface MatrixProps {
  two_matrix: number[][]; // 2D matrix to display
}

const MatrixComponent: React.FC<MatrixProps> = ({ two_matrix }) => {
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
        Matrix Display
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
              >
                {item}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixComponent;
