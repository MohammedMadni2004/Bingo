import React from "react";
import { motion } from "framer-motion"; 

type PlayerTurnProps = {
  conditionMessage: string;
};

const PlayerTurnIndicator: React.FC<PlayerTurnProps> = ({ conditionMessage }) => {
  let turnConfigMessage: string | null = null;
  let styleClass = "";

  if (conditionMessage === "true") {
    turnConfigMessage = "YOUR MOVE!!";
    styleClass = "text-yellow-500";
  } else if (conditionMessage === "false") {
    turnConfigMessage = "OPPONENT'S MOVE!!";
    styleClass = "text-red-500";
  } else if (conditionMessage.includes('WON')) {
    console.log('solve');
    turnConfigMessage = conditionMessage;
    styleClass = "text-red-500";
    console.log(turnConfigMessage);
  }

  return (
    <>
      {turnConfigMessage && (
        <motion.h1 className={`${styleClass} relative -top-24 sm:-top-8`}>
          {turnConfigMessage}
        </motion.h1>
      )}
    </>
  );
};

export default PlayerTurnIndicator;
