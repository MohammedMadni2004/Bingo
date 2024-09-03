// import { player } from "./types";
// import { v4 as uuidv4 } from "uuid";

// class _signalingManager {
//   public gameManager: player[][];
//   private pendingPlayer?: player;
//   private static instance?: _signalingManager;
//   constructor() {
//     this.gameManager = [];
//     this.pendingPlayer = undefined;
//   }
//   public static getInstance() {
//     if (this.instance) {
//       return this.instance;
//     }
//     this.instance = new signalingManager();
//     return this.instance;
//   }

//   getPlayer(ws: WebSocket): player {
//     const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
//     for (let i = numbers.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
//     }
//     const final: number[][] = Array.from({ length: 5 }, (_, i) =>
//       numbers.slice(i * 5, (i + 1) * 5)
//     );
//     return {
//       id: uuidv4(),
//       gameState: final,
//       isPlaying: false,
//       ws: ws,
//     };
//   }
//   addPlayer(ws: WebSocket) {
//     if (this.pendingPlayer) {
//       this.addGroup([this.pendingPlayer, this.getPlayer(ws)]);
//     } else {
//       this.pendingPlayer = this.getPlayer(ws);
//     }
//   }
//   getAnotherPlayer(id: string) {
//     const idx = this.gameManager.findIndex((room) =>
//       room.find((player) => player.id == id)
//     );
//     return this.gameManager[idx][0].id === id
//       ? this.gameManager[idx][1]
//       : this.gameManager[idx][0];
//   }
//   findPlayer(id: string) {
//     const idx = this.gameManager.findIndex((room) =>
//       room.find((player) => player.id == id)
//     );
//     return this.gameManager[idx][0].id === id
//       ? this.gameManager[idx][0]
//       : this.gameManager[idx][1];
//   }
//   switchPlayers(currentPlayer: player, otherPlayer: player) {
//     if (!currentPlayer.isPlaying) return;
//     currentPlayer.isPlaying = false;
//     currentPlayer.timeout = undefined;
//     otherPlayer.isPlaying = true;
//     otherPlayer.timeout = setTimeout(
//       () => this.switchPlayers(otherPlayer, currentPlayer),
//       5000
//     );
//     currentPlayer.ws.send(JSON.stringify(currentPlayer));
//     otherPlayer.ws.send(JSON.stringify(otherPlayer));
//   }

//   addGroup(players: player[]) {
//     if (!(players.length === 2)) {
//       return;
//     }
//     players[0].isPlaying = true;
//     players[0].timeout = setTimeout(
//       () => this.switchPlayers(players[0], players[1]),
//       5000
//     );
//     this.gameManager.push(players);
//   }
//   checkIsValid(x: number, y: number, player: player) {
//     return (
//       x <= 24 &&
//       x >= 0 &&
//       y <= 24 &&
//       y >= 0 &&
//       player.gameState[x][y] != 0 &&
//       player.isPlaying == true
//     );
//   }
//   // call when player presses bingo this gets triggered when user pressed bingo can ve valid or invalid bingo
//   // checkWin(playerId: string) {
//   //   const player = this.findPlayer(playerId);
//   //   //if (won) {
//   //     // send both the players status ie for player you won and other player you lost... 
//   //   }else{
//   //     // send the player who sent bongo as invalid...
//   //   }
//   // }
//   handleMove(x: number, y: number, playerId: string) {
//     // we can indeed take a matrix instead of x,y but if we do that the user can inspect and send cheated matrix
//     const player = this.findPlayer(playerId);
//     if (!this.checkIsValid(x, y, player)) {
//       // just switch players as player made invalid move.
//       const otherPlayer = this.getAnotherPlayer(playerId);
//       this.switchPlayers(player, otherPlayer);
//       return;
//     }
//     const otherPlayer = this.getAnotherPlayer(playerId);
//     this.switchPlayers(player, otherPlayer);
//     player.gameState[x][y] = 0;
//     player.ws.send(JSON.stringify(player));
//     otherPlayer.ws.send(JSON.stringify(otherPlayer));   
//   }
//   removeGroup(player: player) {
//     // TODO: loop through players array and remove the group in which this perticular player exists even if one player disconnects this should be called
//   }
// }

// export const signalingManager = _signalingManager.getInstance();
