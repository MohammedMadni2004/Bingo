import express from "express";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from "ws";
import { player, Game } from "./types";
import { v4 as uuid } from "uuid";
import { handleReset, findPlayer, findGame, deleteUsers } from "./gameManager";
import {
  updateMatrix,
  checkWin,
  checkDiagonals,
  handleInit,
  switchUser,

} from "./gameManager";
import path from "path";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "35mb" }));

let group: player[] = [];
let gameManager: Game[] = [];
let players: player[] = [];
app.use(express.static(path.join(__dirname, "/fe")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/fe/index.html"));
});

const h_server = app.listen(8080, () => {
  console.log("Server is running on port 80");
});

const wss = new WebSocketServer({ server: h_server });

wss.on("connection", function connection(ws: WebSocket) {
  const playerId = uuid();
  const playerSocket = ws;
  players.push({ id: playerId, Socket: playerSocket });
  group.push({ id: playerId, Socket: playerSocket });
  if (group.length === 1) {
    group[0].Socket.send(group[0].id);
  } 
  if (group.length === 2) {
    group[1].Socket.send(group[1].id);
    group[0].Socket.send("start");
    group[1].Socket.send("start");
    let gameid = uuid();
    group[0].gameid = gameid;
    group[1].gameid = gameid;
    gameManager.push({
      gameId: gameid,
      players: [group[0], group[1]],
      moveCount: 0,
    });
    const player_one = players.find((p) => group[0].id === p.id);
    const player_two = players.find((p) => group[1].id === p.id);
    if (player_one && player_two) {
      player_two.gameid = gameid;
      player_one.gameid = gameid;
      console.log(player_one.gameid, player_two.gameid);
    } else {
      console.log("ok");
    }
    group = [];
  }

  ws.on("message", function message(data: string) {
    const parsed_data = JSON.parse(data);
    if (parsed_data.type == "init") {
      const bingo_matrix = handleReset();
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        player.gameState = bingo_matrix;
        console.log(player.gameid);
        const game = findGame(gameManager, player);
        if (game) {
          handleInit(game, index);
        }
      }
    }

    if (parsed_data.type == "move") {
     
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        const game = findGame(gameManager, player);
        if (player.isPlaying == true && player.gameState) {
          console.log("player 0 is elog");
          updateMatrix(player.gameState, parsed_data.n);
          const other_index = index === 0 ? 1 : 0;
          if (game) {
           // setTimeout(()=>{
            //   switchUser(game,index,other_index);
            //   game.moveCount=game.moveCount+1;
            // },8000)
            game.moveCount = game.moveCount + 1;
            console.log(game.moveCount);
            if ((game.moveCount % 2) + 1 == 2) {
              console.log("swich user if");
              switchUser(game, index, other_index, parsed_data.n);
            } else {
              game.players[index].Socket.send("true");
            }
          }
        }
      }
    }
    else if (parsed_data.type == "bingo") {
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        if (player.gameState) {
          const rows = checkWin(player.gameState);
          const win_diag = checkDiagonals(player.gameState, 0) + checkDiagonals(player.gameState, 4);
          if (rows + win_diag >= 5) {
            const game = findGame(gameManager, player);
            if (game) {
              player.Socket.send('u win');
              const other_index = index === 0 ? 1 : 0;
              game.players[other_index].Socket.send('other player won');
              deleteUsers(players, game, gameManager);
            }
          }
          else {
            player.Socket.send('invalid req')
          }
        }
      }
    }
  });

  wss.on("close", function disconnection(ws) {
    console.log("disco");
  });
});

