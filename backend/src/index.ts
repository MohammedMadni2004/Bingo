import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from "ws";
import { log } from "util";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "35mb" }));
let group: { id: Number; ws: WebSocket }[] = [];
let gameId = 1;

let gameManager: { id: Number; ws: WebSocket, mat?: Number[][], isPlaying?: boolean }[][] = [];
let id = 0;
let startindex = -2

app.get("/", (req, res) => {
  res.send("hello");
});

const h_server = app.listen(3000);
const wss = new WebSocketServer({ server: h_server });

wss.on("connection", function connection(ws) {
  group.push({ id: ++id, ws });
  if (group.length === 2) {
    group[0].ws.send("play");
    group[1].ws.send("wait");

    startindex += 2;
    let matState = Array(5).fill(Array(5).fill(0));

    gameManager[gameId] = group.map(player => ({
      ...player,
      mat: matState
    }));
    group = []
    gameId++;
  }


  ws.on("message", function message(data: string) {
    const parsed_data = JSON.parse(data);
    if (parsed_data.init === "init") {
      gameManager.forEach((game) => {game.ws.send("Start")})
    }
    if (parsed_data.init === "move") {
      console.log(parsed_data.number);
    }
  });
  ws.on("error", (err) => console.log("error:", err));
});
