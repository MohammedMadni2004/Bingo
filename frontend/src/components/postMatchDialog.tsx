import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import React, { useState } from "react";
type DialogProps = {
  description: string | null;
  message: string[];
  socket: WebSocket;
};
const DialogBox: React.FC<DialogProps> = ({ description, message, socket }) => {
  const winMessages = [
    "🎉 Congratulations! You’ve Bingo-ed your way to victory! Amazing job! 🏆",
    "🎊 What a game! You’re the Bingo champion! Kudos to you! 🥳",
    "🥇 Bingo! You’ve got the perfect mix of luck and strategy. Well played!",
    "🏅 Victory is yours! You’ve mastered the art of Bingo! 🙌",
    "🌟 Fantastic! You’ve crossed the finish line in style! Bingo is all yours! 🎯"
  ];
  
  const loseMessages = [
    "😔 So close, yet so far! Better luck next time! Keep that Bingo spirit alive!",
    "🌀 Not a win this time, but every game is a step towards victory. Don’t give up!",
    "🤷 Sometimes the numbers just don’t align. There’s always the next round!",
    "😅 Bingo wasn’t in the cards for you this time. Keep trying—you’ve got this!",
    "🌈 Every game is a new adventure. Win or lose, you’re still awesome! 💪"
  ];
  
  const [resultDescription,setResultDescription]= useState('');
  const isOpen = true;
  let dialogTitle;
  if (description === "HOORAH!! U WON") {
    dialogTitle = "U WON";
    setResultDescription(winMessages[Math.floor(Math.random()*5)]);
  } else if (description === "BAD LUCK!! OTHER PLAYER WON") {
    dialogTitle = "loose";
    setResultDescription(loseMessages[Math.floor(Math.random()*5)]);
  }
  function rematch(msg: string, event: React.MouseEvent<HTMLButtonElement>) {
    console.log(msg);
    if(msg === "play again"){
      socket.send(
        JSON.stringify({
          id: message[0],
          type: "play again",
          
        })
      );
    }
    else{    
    socket.send(
      JSON.stringify({
        id: message[0],
        type: "rematch",
        status:msg,
      })
    );
  }
    console.log(
      socket.send(
        JSON.stringify({
          id: message[0],
          type: { msg },
        })
      )
    );
    const button = event.currentTarget;
    button.disabled = true;
  }
  console.log(message[message.length - 1]);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{resultDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between mt-4">
            <motion.button
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(event) => rematch("send", event)}
            >
              REQUEST FOR REMATCH
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-black-500 text-blue rounded-md hover:bg-black-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(event) => rematch("play again", event)}
            >
              PLAY OTHER GAME WITH RANDOM OPPONENT
            </motion.button>
          </div>
          {message[message.length - 1] === "opponent wants  a  Rematch" && (
            <motion.button
              className="px-4 py-2 bg-black-500 text-blue rounded-md hover:bg-black-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(event) => rematch("accept", event)}
            >
              {" "}
              ACCEPT REMATCH{" "}
            </motion.button>
          )}
         {message[message.length - 1] === "opponent wants  a  Rematch" && (
                      <motion.button
                      className="px-4 py-2 bg-black-500 text-blue rounded-md hover:bg-black-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(event) => rematch("decline", event)}
                    >
                      {" "}
                      DECLINE REMATCH{" "}
                    </motion.button>
         )}

        </DialogContent>
      </Dialog>
      {message[message.length - 1]}
    </>
  );
};
export default DialogBox;
