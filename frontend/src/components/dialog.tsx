import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import React from "react";
type DialogProps = {
  description: string | null;
  message:string[];
  socket:WebSocket;
};
const DialogBox: React.FC<DialogProps> = ({ description,message,socket }) => {
  const isOpen = true;
  let dialogTitle;
  let dialogDescription;
  if (description === "HOORAH!! U WON") {
    dialogTitle = "U WON";
    dialogDescription = "HOORAH!! U WON";
  } else if (description === "BAD LUCK!! OTHER PLAYER WON") {
    dialogTitle = "loose";
    dialogDescription = "BAD LUCK!! U LOOSE";
  }
  function rematch(msg:string,event:React.MouseEvent<HTMLButtonElement>){
    socket.send(
      JSON.stringify({
        id: message[0],
        type: msg,
      })
    );
      const button=event.currentTarget;
      button.disabled=true;
  }
  console.log(message[message.length-1])

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between mt-4">
          <motion.button 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(event) => rematch('rematch',event)} >
            REQUEST FOR REMATCH 
          </motion.button>
          <motion.button 
          className="px-4 py-2 bg-black-500 text-blue rounded-md hover:bg-black-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(event) => rematch("play again",event) }
          >
            PLAY OTHER GAME WITH RANDOM OPPONENT
          </motion.button>
        </div>
        {message[message.length-1]==="opponent wants  a  Rematch"&&(<motion.button 
                className="px-4 py-2 bg-black-500 text-blue rounded-md hover:bg-black-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(event) => rematch('accept',event) }
                > ACCEPT REMATCH </motion.button>)}
        </DialogContent>
      </Dialog>
     {message[message.length-1]}
    
    </>
  );
};
export default DialogBox;
