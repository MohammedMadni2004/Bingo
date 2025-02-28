import express from "express";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from "ws";
import { player, Game } from "./types";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";

import { handleReset, findPlayer, findGame, deleteGame, createMatch } from "./gameManager";
import {
  updateMatrix,
  checkWin,
  checkDiagonals,
  handleInit,
  switchUser,
} from "./gameManager";
import path, { parse } from "path";

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "35mb" }));

let group: player[] = [];
let gameManager: Game[] = [];
let players: player[] = [];

app.use(express.static(path.join(__dirname, "../dist/fe")));

app.get("/", (req: Request, res: Response) => {
  res.json({"success":true});
});

const h_server = app.listen(8080, () => {
  console.log("Server is running on port 8080");
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
    createMatch(group,gameManager,players); 
    group=[];
  }

  ws.on("message", function message(data: string) {
    const parsed_data = JSON.parse(data);
    if (parsed_data.type == "init") {
      const bingo_matrix = handleReset();
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        player.gameState = bingo_matrix;
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
          updateMatrix(player.gameState, parsed_data.n);
          const other_index = index === 0 ? 1 : 0;
          if (game) {
            game.moveCount = game.moveCount + 1;
            if ((game.moveCount % 2) + 1 == 2) {
              switchUser(game, index, other_index, parsed_data.n);
            } else {
              game.players[index].Socket.send("true");
            }
          }
        }
      }
    } else if (parsed_data.type == "bingo") {
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        if (player.gameState) {
          const rows = checkWin(player.gameState);
          const win_diag =
            checkDiagonals(player.gameState, 0) +
            checkDiagonals(player.gameState, 4);
          if (rows + win_diag >= 5) {
            const game = findGame(gameManager, player);
            if (game) {
              player.Socket.send("HOORAH!! U WON");
              const other_index = index === 0 ? 1 : 0;
              game.players[other_index].Socket.send(
                "BAD LUCK!! OTHER PLAYER WON"
              );
            }
          } else {
            player.Socket.send("invalid req");
          }
        }
      }
    } else if (parsed_data.type === "rematch") {

      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        const game = findGame(gameManager, player);
        if (game) {
          const otherPlayerIndex = index === 0 ? 1 : 0;
          let rematchResponse = "";
            // parsed_data.status === "send"
            //   ? "opponent wants  a  Rematch"
            //   : "accepted rematch";

          if (parsed_data.status === "accept") {
            rematchResponse="accepted rematch"
            player.Socket.send("accepted rematch");
            player.gameState = undefined;
            game.players[otherPlayerIndex].gameState = undefined;
            game.moveCount = 0;
            game.players[otherPlayerIndex].Socket.send(rematchResponse);
          }
          else if(parsed_data.status === "send"){
              rematchResponse="opponent wants  a  Rematch";
              game.players[otherPlayerIndex].Socket.send(rematchResponse);
          }
          else if(parsed_data.status === "decline"){
            rematchResponse="opponent declined to rematch";
            player.Socket.send('declined rematch');
            game.players[otherPlayerIndex].Socket.send(rematchResponse);
            const gameIndex=gameManager.findIndex((game)=>game.gameId===game.gameId);
            gameManager.splice(gameIndex,1);
          }
        } else {
          player.Socket.send("could not find game");
        }
      }
    } else if (parsed_data.type === "play again") {
      //random rematch;other player left game
      const result = findPlayer(players, gameManager, parsed_data);
      if (result) {
        const [player, index] = result;
        group.push({ id: player.id, Socket: player.Socket });
        const game = findGame(gameManager, player);
           if(game){
          const otherPlayerIndex = index === 0 ? 1 : 0;
          game.players[otherPlayerIndex].Socket.send("other player left game");
          player.Socket.send("random rematch");
          const gameIndex=gameManager.findIndex((game)=>game.gameId===game.gameId);
          gameManager.splice(gameIndex,1);
          if (group.length === 2) {
            createMatch(group,gameManager,players); 
            group=[];
          }
          }
      }
      else{
        const player=players.find((p)=>p.id===parsed_data.id);
        if(player){
          group.push({ id: player.id, Socket: player.Socket });
          player.Socket.send("random rematch");
          if (group.length === 2) {
            createMatch(group,gameManager,players); 
            group=[];
          }
        }
    }
    }
  });

  ws.on("close", function disconnection(webso: WebSocket) {
    const socket = ws;
    const player = players.find((p) => p.Socket == socket);
    console.log('disconnecion of socket');
    if (player) {
      const game = findGame(gameManager, player);
      if (game) {
        if (game.players[0].Socket === player.Socket) {
          game.players[1].Socket.send("other player left match");
        } else if (game.players[1].Socket === player.Socket) {
          game.players[0].Socket.send("other player left match");
        }
        deleteGame(game,gameManager);
      } else if (!game) {
        const index = group.findIndex((g) => g.id === player.id);
        if (index >= 0) {
          group.splice(index, 1);
        }
        const p_index = players.findIndex((p) => p.id === player.id);
        if (p_index >= 0) {
          players.splice(p_index, 1);
        }
      }
    }
  });
});
