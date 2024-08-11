export type player = {
  id: string;
  ws: WebSocket;
  gameState: number[][];
  isPlaying: Boolean;
  timeout?: NodeJS.Timeout;
};