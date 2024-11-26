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
          className={`${styleClass} relative -top-24 sm:-top-8`}
          aria-live="polite" // Improves accessibility for screen readers
        >
          {turnConfigMessage}
        </motion.h1>
      )}
    </>
  );
};

export default PlayerTurnIndicator;
