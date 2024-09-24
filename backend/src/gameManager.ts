import { Game, player } from "./types";

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
        console.log(matrix[i][j] === number);
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
    // setTimeout(()=>{
    //   switchUser(game,0,1);
    // },5000);
  }
  else {
    game.players[index].Socket.send('waiting for other player to start');
  }
}
export function switchUser(game: Game, curP_index: number, otherP_index: number, n?: any) {
  console.log('switch user called');
  game.players[curP_index].isPlaying = false;
  game.players[otherP_index].isPlaying = true;
  if (n) {
    game.players[otherP_index].Socket.send(`press ${n}`);
  }
  game.players[curP_index].Socket.send('false');
  game.players[otherP_index].Socket.send('true');
  console.log('switch user completed');

}
export function findPlayer(players: player[], gameManager: Game[], parsed_data): [player, number] | null {
  const player = players.find((p) => p.id == parsed_data.id);
  if (player) {
    console.log("player");
    const game = gameManager.find((g) => g.gameId === player.gameid);
    if (game) {
      console.log("game mila h");
      let operate_player = game.players.find((p) => p.id === player.id);
      if (operate_player) {
        if (game.players[0].id === operate_player.id) {
          console.log(game.players[0].gameid);
          return [game.players[0], 0];
        }
        else if (game.players[1].id === operate_player.id) {
          return [game.players[1], 1];
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
  return null;

}

export function findGame(gameManager: Game[], Player: player) {
  const game = gameManager.find((g) => g.gameId === Player.gameid);
  console.log(Player.gameid);
  if (game) {
    return game;
  }
  else {
    console.log()
    console.log("couldn't find game");
  }
}
export function deleteUsers(players: player[], game: Game, gameManager: Game[]) {
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
}