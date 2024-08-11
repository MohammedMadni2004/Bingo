import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import { signalingManager } from "./sinalingManger";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "35mb" }));

app.get("/", (req, res) => {
  res.send("hello");
});

const h_server = app.listen(3000);
const wss = new WebSocketServer({ server: h_server });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data: string) {
    const parsed_data = JSON.parse(data);
    // call all methods things like these....
    if (parsed_data.type === "init") {
      signalingManager.addPlayer();
    }
    if (parsed_data.type === "move") {
    }
    if (parsed_data.type === "bingo") {
    }
  });
  ws.on("error", (err) => console.log("error:", err));
});
