import { motion } from "framer-motion";
import GameRules from "./GameRules";

type LoaderProps = {
  message: string;
};

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4 py-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-t-4 border-b-4 border-pink-500 animate-ping"></div>
        <div className="absolute top-0 left-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse"></div>
      </div>

      <motion.h1
        className="mt-8 text-3xl font-bold text-white text-center px-4 drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Wait for the other player to {message}
      </motion.h1>

      <div className="mt-8 w-full flex justify-center">
        <GameRules compact className="mt-4" />
      </div>
    </div>
  );
};

export default Loader;
