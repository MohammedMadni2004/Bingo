import { useState, useEffect} from "react";
import { setMatrix } from "./functionality";
import MatrixComponent from "./components/matrix";
import Loader from "./components/loader";
import StartGameButton from "./components/startGame";

function App() {
  const [message, setMessage] = useState<string[]>([]);
  const socket=useRef< WebSocket | null>();
  let matrix: number[][] = [];
  
  useEffect(() => {
    socket.current = new WebSocket("ws://bingo.mini-miletia.one");
    socket.current.onopen = () => {
     console.log('Socket connected');
    };

    socket.current.onmessage = (event) => {

      setMessage((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        return newMessages;
      });
    };
    return () => {
      if(socket.current){
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
  } else if (message.length === 2) {
    return (
     <>
      {socket.current && < StartGameButton message={message} socket={socket.current} />}
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
      {socket.current && <MatrixComponent socket={socket.current} message={message} two_matrix={matrix} />}
      </>
    );
  }
  
 
}

export default App;
