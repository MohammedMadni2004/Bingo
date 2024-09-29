import { useState, useEffect } from "react";
import { setMatrix } from "./functionality";
import MatrixComponent from "./components/matrix";
import Loader from "./components/loader";
import StartGameButton from "./components/startGame";

function App() {
  const [message, setMessage] = useState<string[]>([]);
  const [socket, setSocket] = useState<null | WebSocket>(null);
  let matrix: number[][] = [];
  
  useEffect(() => {
    const socket = new WebSocket("ws://bingo.mini-miletia.one");
    socket.onopen = () => {
      setSocket(socket);
    };

    socket.onmessage = (event) => {

      setMessage((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        return newMessages;
      });
    };
    return () => {
      socket.close();
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
  } else if (message.length === 2) {
    return (

      <StartGameButton message={message} socket={socket} />

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
      <MatrixComponent socket={socket} message={message} two_matrix={matrix} />
    );
  }
}

export default App;
