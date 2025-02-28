import { Game, player } from "./types";
import { v4 as uuid } from "uuid";

export function handleReset() {
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  const final: number[][] = Array.from({ length: 5 }, (_, i) =>
    numbers.slice(i * 5, (i + 1) * 5)
  );
  return final;
};
export function updateMatrix(matrix: number[][], n: string) {
  let number = parseInt(n);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === number) {
        matrix[i][j] = 0;
      }
      else if (matrix[i][j] === 0) {
        console.log("duplicate move");
      }
    }
  }
};
export function checkWin(matrix: number[][]) {
  let count = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[i][j] === 0) {
        if (j == 4) {
          count++;
        }
        continue;
      }
      else if (matrix[i][j] != 0) {
        break;
      }
    }
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (matrix[j][i] === 0) {
        if (j == 4) {
          count++;
        }
        continue;
      }
      else if (matrix[j][i] != 0) {
        break;
      }
    }
  }
  return count;
}
export function checkDiagonals(matrix: number[][], j: number): number {
  if (matrix[2][2] == 1) {
    return 0;
  }
  let temp = j;
  for (let i = 0; i < 5; i++) {
    if (matrix[i][j] !== 0) {
      return 0;
    }
    else if (matrix[i][j] == 0) {
      if (i == 4 && (j == 4 || j == 0)) {
        return 1;
      }
      else if (temp == 4) {
        j--;
      }
      else if (temp == 0) {
        j++;
      }
    }
  }
  return 0;
}

export function handleInit(game: Game, index: number) {
  if (game.players[0].gameState && game.players[1].gameState) {
    const firstmat = game.players[0].gameState;
    const secmat = game.players[1].gameState;
    game.players[0].Socket.send(`${firstmat}`);
    game.players[1].Socket.send(`${secmat}`);
    game.players[0].Socket.send('true');
    game.players[0].isPlaying = true;
    game.players[1].Socket.send('false');
    game.players[1].isPlaying = false;
   
  }
  else {
    game.players[index].Socket.send('waiting for other player to start');
  }
}
export function switchUser(game: Game, curP_index: number, otherP_index: number, n?: any) {
  game.players[curP_index].isPlaying = false;
  game.players[otherP_index].isPlaying = true;
  if (n) {
    game.players[otherP_index].Socket.send(`press ${n}`);
  }
  game.players[curP_index].Socket.send('false');
  game.players[otherP_index].Socket.send('true');

}
export function findPlayer(players: player[], gameManager: Game[], parsed_data): [player, number] | null {
  const player = players.find((p) => p.id == parsed_data.id);
  if (player) {
    const game = gameManager.find((g) => g.gameId === player.gameid);
    if (game) {
      let operate_player = game.players.find((p) => p.id === player.id);
      if (operate_player) {
        if (game.players[0].id === operate_player.id) {
          return [game.players[0], 0];
        }
        else if (game.players[1].id === operate_player.id) {
          return [game.players[1], 1];
        }
      } else {
        console.log("phir player nahi mila h");
      }
    } else {
      console.log("couldn't find game");
    }
  } else {
    console.log("no player found");
  }
  return null;

}

export function findGame(gameManager: Game[], Player: player) {
  const game = gameManager.find((g) => g.gameId === Player.gameid);
  if (game) {
    return game;
  }
  else {
    console.log("couldn't find game");
  }
}

export function deleteGame(game:Game,gameManager:Game[]){
  let gameIndex = gameManager.indexOf(game);
  if (gameIndex != -1) {
     
    gameManager.splice(gameIndex, 1);
  }

}
 export function createMatch(group:player[],gameManager:Game[],players:player[]){
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
  } else {
    console.log("Server error");
  }
  group = [];
 }