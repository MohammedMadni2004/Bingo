import { motion } from "framer-motion";
import GameRules from "./GameRules";

type HomePageProps = {
  onFindGame: () => void;
};

const HomePage: React.FC<HomePageProps> = ({ onFindGame }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-8">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center mb-2"
        style={{ fontFamily: "'Brush Script MT', cursive", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Bingo
      </motion.h1>
      <motion.p
        className="text-white/80 text-center text-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Two players · First to get 5 in a line wins
      </motion.p>

      <GameRules className="mb-8" />

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
        onClick={onFindGame}
        className="px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-2xl font-bold rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-pink-300 transform transition-all duration-300 ease-in-out relative overflow-hidden group"
      >
        <span className="relative z-10">Find Game</span>
        <motion.div
          className="absolute inset-0 bg-white opacity-20"
          initial={{ scale: 0, x: "100%", y: "100%" }}
          whileHover={{ scale: 1.5, x: 0, y: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>
    </div>
  );
};

export default HomePage;
