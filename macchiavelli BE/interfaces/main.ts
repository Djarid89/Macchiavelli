import { Card, Combination } from "../class/main";

export enum Seed {
  Hearts = 0,
  Tiles,
  Clovers,
  Pikes
}

export interface IPlayer {
  name: string;
  isMyTurn: boolean;
  cards: Card[];
}

export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void; a is inferred as number, b as string and c as buffer
  // withAck: (d: string, callback: (e: number) => void) => void; d is inferred as string and callback as a function that takes a number as argument
  startGame: (players: IPlayer[]) => void;
  getNextPlayer: (players: IPlayer[]) => void;
  getCombinations: (combinations: Combination[]) => void;
}

export interface ClientToServerEvents {
  asd: () => undefined;
}

export interface InterServerEvents {
  asd(): () => undefined;
}

export interface SocketData {
  name: string;
  age: number;
}
