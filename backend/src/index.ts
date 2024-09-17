import express from "express";
import bodyParser from "body-parser";
import WebSocket, { WebSocketServer } from "ws";
import { player, Game } from "./types";
import { v4 as uuid } from "uuid";
import { handleReset } from "./gameManager";
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
  const playerid = uuid();
  const playerSocket = ws;
  players.push({ id: playerid, Socket: playerSocket });
  group.push({ id: playerid, Socket: playerSocket });
  if (group.length === 1) {
    group[0].Socket.send(`${group[0].id}`);
  } else if (group.length === 2) {
    console.log(group[1].id);

    group[1].Socket.send(`${group[1].id}`);
    group[0].Socket.send("start");
    group[1].Socket.send("start");
    let gameid = uuid();
    gameManager.push({
      gameId: gameid,
      players: [group[0], group[1]],
      moveCount: 0,
    });
    console.log(gameManager);
    //  group[0].Socket.send(`id:${gameid}`);
    //  group[1].Socket.send(`id:${gameid}`);
    let player_one = players.find((p) => group[0].id === p.id);
    let player_two = players.find((p) => group[1].id === p.id);
    if (player_one && player_two) {
      player_two.gameid = gameid;
      player_one.gameid = gameid;
      //player_one.Socket.send(`${gameid}`);
      //player_two.Socket.send(`${gameid}`);
    } else {
      console.log("ok");
    }
    group = [];
  }

  ws.on("message", function message(data: string) {
    const parsed_data = JSON.parse(data);
    if (parsed_data.type == "init") {
      const player = players.find((p) => p.id === parsed_data.id);
      if (player) {
        console.log("player");
        const game = gameManager.find((g) => g.gameId === player.gameid);
        if (game) {
          console.log("game mila h");
          let mat_player = game.players.find((p) => p.id === player.id);
          if (mat_player) {
            console.log("mat_player");
            //call function here that would generate 2d mattrix)};
            const bingo_matrix = handleReset();
            if (game.players[0].id === mat_player.id) {
              game.players[0].gameState = bingo_matrix;
              handleInit(game, 0);
            } else if (game.players[1].id === mat_player.id) {
              game.players[1].gameState = bingo_matrix;
              handleInit(game, 1);
            }
          }
          if (!mat_player) {
            console.log("player nahi mila bsdk");
          }
        }
      } else {
        console.log("dont");
      }
    }

    //This thing is done:we have a player who has sent init message and that guy's matrix must be updated in gameManager array also in the player we have the gameId
    //now create a random matrix just need to understand little  bit about what it's already done in frontend
    //also save matrix in the gamemanager

    if (parsed_data.type == "move") {
      //think what will happen if user clicks a number how u can save the state of matrix so that it is easy to check for win
      //also think how u could manage the switching user every 5-10 seconds
      //so they r gonna send the player id and then u find appropriate player
      //along with that they will send a number based on which u need to modify the gamestate of that player
      //u can make that number to be like 0
      const player = players.find((p) => p.id === parsed_data.id);
      if (player) {
        console.log("player");
        const game = gameManager.find((g) => g.gameId === player.gameid);
        if (game) {
          console.log("game mila h");
          let operate_player = game.players.find((p) => p.id === player.id);
          if (operate_player) {
            if (
              game.players[0].id === operate_player.id &&
              game.players[0].gameState
            ) {
              //iska matstate update karna h mere biraadar
              if (game.players[0].isPlaying == true) {
                console.log("player 0 is elog");

                updateMatrix(game.players[0].gameState, parsed_data.n);
                game.moveCount = game.moveCount + 1;
                console.log(game.moveCount);
              }
              if ((game.moveCount % 2) + 1 === 2) {
                console.log("swich user if");
                switchUser(game, 0, 1, parsed_data.n);
              } else {
                game.players[0].Socket.send("true");
              }
            } else if (
              game.players[1].id === operate_player.id &&
              game.players[1].gameState
            ) {
              if (game.players[1].isPlaying == true) {
                console.log("player 1 is elog");
                updateMatrix(game.players[1].gameState, parsed_data.n);
                game.moveCount = game.moveCount + 1;
                console.log(game.moveCount);
              }
              if ((game.moveCount % 2) + 1 == 2) {
                console.log("swich user if");
                switchUser(game, 1, 0, parsed_data.n);
              } else {
                game.players[1].Socket.send("true");
              }
            }
          } else {
            console.log("phir player nahi mila h");
          }
        } else {
          console.log("game nahi mila");
        }
      } else {
        console.log("players wale me nahi mila hai");
      }
    } else if (parsed_data.type == "bingo") {
      //check is it proper
      const player = players.find((p) => p.id === parsed_data.id);
      if (player) {
        console.log("player");
        const game = gameManager.find((g) => g.gameId === player.gameid);
        if (game) {
          console.log("game mila h");
          let operate_player = game.players.find((p) => p.id === player.id);
          if (operate_player) {
            if (
              game.players[0].id === operate_player.id &&
              game.players[0].gameState
            ) {
              //check weather it state is proper to declare him as winner
              let rows = checkWin(game.players[0].gameState);
              let win_diag =
                checkDiagonals(game.players[0].gameState, 0) +
                checkDiagonals(game.players[0].gameState, 4);
              if (rows + win_diag >= 5) {
                //handle the winner over here
                game.players[1].Socket.send("other player won");
                game.players[0].Socket.send("u win");
                //remove players from gameMnager and players array
                let firstIndex = players.indexOf(game.players[0]);
                let secondIndex = players.indexOf(game.players[1]);
                if (firstIndex != -1) {
                  players.splice(firstIndex, 1);
                }
                if (secondIndex != -1) {
                  players.splice(secondIndex, 1);
                }
                let gameIndex = gameManager.indexOf(game);
                if (gameIndex != -1) {
                  gameManager.splice(gameIndex, 1);
                }
              } else if (rows + win_diag < 5) {
                game.players[0].Socket.send("invalid req");
              }
            } else if (
              game.players[1].id === operate_player.id &&
              game.players[1].gameState
            ) {
              //check weather it state is proper to declare him as winner
              let rows = checkWin(game.players[1].gameState);
              let win_diag =
                checkDiagonals(game.players[1].gameState, 0) +
                checkDiagonals(game.players[1].gameState, 4);
              if (rows + win_diag >= 5) {
                //handle the winner over here
                game.players[0].Socket.send("u lost");
                game.players[1].Socket.send("u win");
                let firstIndex = players.indexOf(game.players[0]);
                let secondIndex = players.indexOf(game.players[1]);
                if (firstIndex != -1) {
                  players.splice(firstIndex, 1);
                }
                if (secondIndex != -1) {
                  players.splice(secondIndex, 1);
                }
                let gameIndex = gameManager.indexOf(game);
                if (gameIndex != -1) {
                  gameManager.splice(gameIndex, 1);
                }
              } else if (rows + win_diag < 5) {
                game.players[1].Socket.send("invalid req");
              }
            }
          } else {
            console.log("phir player nahi mila h");
          }
        } else {
          console.log("game nahi mila");
        }
      } else {
        console.log("players wale me nahi mila hai");
      }
    }
  });
  // ws.on('disconnection',function disconnection(){
  // //remove players from gameManager and players array
  // console.log('hello');

  //   let player= players.find((p)=>{
  //      return p.Socket===ws;
  //    });
  //    if(player){
  //    console.log("kuch to hua h",player.id);}
  //    //just remove from gameManager;
  // });
  wss.on("close", function disconnection(ws) {
    console.log("disco");
  });
});

//remove players from gameManager and players array
