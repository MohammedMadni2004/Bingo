import WebSocket, { WebSocketServer } from "ws";

export type player = {
  id: string;
  Socket: WebSocket;
  gameState?: number[][];
  isPlaying?: Boolean;
  timeout?: NodeJS.Timeout;
  gameid?:string;
};
export type Game = {
  gameId:string,
  players: player[];
};