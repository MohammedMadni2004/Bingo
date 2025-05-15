import React from "react";
import { motion } from "framer-motion";

type PlayerTurnProps = {
  conditionMessage: string;
};

const PlayerTurnIndicator: React.FC<PlayerTurnProps> = ({
  conditionMessage,
}) => {
  let turnConfigMessage: string | null = null;
  let styleClass = "";
  if (conditionMessage === "true") {
    turnConfigMessage = "YOUR MOVE!!";
    styleClass = "text-yellow-500";
  } else if (conditionMessage === "false") {
    turnConfigMessage = "OPPONENT'S MOVE!!";
    styleClass = "text-red-500";
  } else if (conditionMessage.includes("HOORAH!! U WON")) {
    turnConfigMessage = "HOORAH!! U WON";
    styleClass = "text-green-500";
  } else if (conditionMessage.includes("BAD LUCK!! OTHER PLAYER WON")) {
    turnConfigMessage = "BAD LUCK!! OTHER PLAYER WON";
    styleClass = "text-red-500";
  }

  return (
    <>
      {turnConfigMessage && (
         <motion.h1
         className={`text-center text-xl sm:text-2xl font-semibold mt-4 sm:mt-6 ${styleClass}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
         aria-live="polite"
       >
         {turnConfigMessage}
       </motion.h1>
      )}
    </>
  );
};

export default PlayerTurnIndicator;
