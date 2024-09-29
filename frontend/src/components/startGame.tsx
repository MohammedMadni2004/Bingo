import { motion } from "framer-motion";

type StartGameButtonProps= {
  message: string[];
  socket: WebSocket;
}

const StartGameButton: React.FC<StartGameButtonProps> = ({ message, socket }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.5)" }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => {
          socket.send(
            JSON.stringify({
              id: message[0],
              type: "init",
            })
          );
        }}
        className="px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                  text-white text-2xl font-bold rounded-full shadow-lg focus:outline-none
                  focus:ring-4 focus:ring-pink-300 transform transition-all
                  duration-300 ease-in-out relative overflow-hidden group"
      >
        <span className="relative z-10">Start Game</span>
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

export default StartGameButton;
