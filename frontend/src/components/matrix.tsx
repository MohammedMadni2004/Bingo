import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import GameComponent from "./isPlay";
import PlayerTurnIndicator from "./PlayerTurn";
import DialogBox from "./dialog";
type MatrixProps = {
  two_matrix: number[][];
  socket: WebSocket;
  message: string[];
};

const MatrixComponent: React.FC<MatrixProps> = ({
  two_matrix,
  socket,
  message,
}) => {
  const [dialog, setDialog] = useState(false);
  function handleMove(event: React.MouseEvent): void {
    const target = event.target as HTMLElement;
    const n = target.innerText;
    socket.send(
      JSON.stringify({
        id: message[0],
        type: "move",
        n: n,
      })
    );

    target.classList.add(
      "bg-gradient-to-r",
      "from-red-500",
      "via-red-600",
      "to-red-700",
      "text-white",
      "shadow-xl",
      "transform",
      "scale-105",
      "transition-all",
      "duration-500",
      "ease-in-out",
      "ring-4",
      "ring-offset-2",
      "ring-red-300"
    );
    target.style.pointerEvents = "none";
  }
  function handlPress(message: string) {
    const n = parseInt(message.split(" ")[1]);
    const targetDiv = document.querySelector(
      `[data-value="${n}"]`
    ) as unknown as any;
    targetDiv.style.pointerEvents = "auto";
  }

  function getPointerEvent(message: any) {
    if (message[message.length - 1] === "false") return "none";
    if (message[message.length - 2].includes("press")) return "none";
    else {
      return "auto";
    }
  }
  function handleWin() {
    socket.send(
      JSON.stringify({
        id: message[0],
        type: "bingo",
      })
    );
  }

  function changeDialog() {
    if (message[message.length - 1].includes("BAD LUCK!! OTHER PLAYER WON")) {
      setDialog(true);
    } else if (message[message.length - 1].includes("HOORAH!! U WON")) {
      setDialog(true);
    }
  }
  if (!dialog) {
    changeDialog();
  }
  return (
    <div className="dark min-h-screen bg-background text-foreground flex flex-col items-center justify-center  ">
      <motion.h1
        className="text-4xl sm:text-6xl absolute top-8 sm:top-16 font-bold text-primary "
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
      <div>
        {message[message.length - 1] == "invalid req" ? (
          (message.pop(),
          (<h1 className="relative top-8 text-red-500">invalid req</h1>))
        ) : (
          <PlayerTurnIndicator conditionMessage={message[message.length - 1]} />
        )}

        {message[message.length - 1] == "false" ? <GameComponent /> : null}
      </div>
      <div className="relative -top-16 sm:top-6 bg-card rounded-lg shadow-lg p-8 m-3 ">
        <div
          className="grid grid-cols-5 gap-4"
          style={{ pointerEvents: getPointerEvent(message) }}
        >
          {two_matrix.map((row, rowIndex) =>
            row.map((item, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className="bg-primary text-primary-foreground rounded-md flex items-center justify-center text-2xl font-bold w-10 h-10 sm:w-16 sm:h-16 cursor-default transition-colors"
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
      <div className="sm:relative sm:top-10">
        {message[message.length - 2].includes("press")
          ? (handlPress(message[message.length - 2]),
            (
              <h1 className="text-blue-500 relative -top-12 sm:-top-0 ">
                {message[message.length - 2]}
              </h1>
            ))
          : null}
      </div>
      <motion.button
        className="cbg-yellow-500  text-purple-500 relative -top-8 sm:top-14"
        onClick={handleWin}
      >
        BINGO WINNER
      </motion.button>
      {dialog && <DialogBox description={message[message.length - 1]} />}
    </div>
  );
};

export default MatrixComponent;
