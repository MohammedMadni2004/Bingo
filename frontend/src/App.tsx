import { useState, useEffect, useRef } from "react";
import { setMatrix } from "./functionality";
import MatrixComponent from "./components/matrix";
import Loader from "./components/loader";
import StartGameButton from "./components/startGame";
import DialogBox from "./components/postMatchDialog";

function App() {
  const [message, setMessage] = useState<string[]>([]);
  const socket = useRef<WebSocket | null>(null);
  let matrix: number[][] = [];

  function clearState(reason: string) {
    if (reason === "rematch") {
      let newarray = [message[0], "start"];
      setMessage(newarray);
    } else {
      const newArray = [message[0]];
      setMessage(newArray);
    }
  }

  useEffect(() => {
    console.log(import.meta.env.VITE_WS_URL);
    socket.current = new WebSocket(import.meta.env.VITE_WS_URL);
    socket.current.onopen = () => {
      console.log("Socket connected");
    };

    socket.current.onmessage = (event: MessageEvent) => {
      setMessage((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        return newMessages;
      });
    };
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);
  if (!socket) {
    return <>no socket </>;
  }
  if (message.length === 1) {
    return (
      <div>
        <Loader message="connect" />
      </div>
    );
  }
  if(message.length >=2 && message[message.length-1] === "other player left match"){
    return (
      <>
      { socket.current &&
      <DialogBox description="other player left match" message={message} socket={socket.current}/> }  
      </>
    )
  }
   else if (message.length === 2) {
    return (
      <>
        {socket.current && (
          <StartGameButton message={message} socket={socket.current} />
        )}
      </>
    );
  } else if (message.length == 3) {
    const len = message.length;
    if (message[len - 1] == "waiting for other player to start") {
      return (
        <>
          <Loader message="start" />
        </>
      );
    } else {
      setMessage((prevMessage) => [...prevMessage, "1"]);
    }
  } else if (message.length >= 4) {
    matrix = setMatrix(message);
    return (
      <>
        {socket.current && (
          <MatrixComponent
            socket={socket.current}
            message={message}
            two_matrix={matrix}
            clearState={clearState}
          />
        )}
      </>
    );
  }
}

export default App;
