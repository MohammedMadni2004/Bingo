import { useState, useEffect, useRef } from "react";
import { setMatrix } from "./functionality";
import MatrixComponent from "./components/matrix";
import Loader from "./components/loader";
import StartGameButton from "./components/startGame";
import DialogBox from "./components/postMatchDialog";
import HomePage from "./components/HomePage";

function App() {
  const [message, setMessage] = useState<string[]>([]);
  const [findingGame, setFindingGame] = useState(false);
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
    if (!findingGame) return;
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
  }, [findingGame]);

  if (!findingGame) {
    return <HomePage onFindGame={() => setFindingGame(true)} />;
  }

  if (!socket.current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin" />
        <p className="mt-6 text-white text-xl font-semibold">Connecting…</p>
      </div>
    );
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
