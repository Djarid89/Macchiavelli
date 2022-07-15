import { CCard, Combination } from "../class/main";


export interface IPlayer {
  name: string;
}

export enum Seed {
  Hearts = 0,
  Tiles,
  Clovers,
  Pikes
}

export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void; a is inferred as number, b as string and c as buffer
  // withAck: (d: string, callback: (e: number) => void) => void; d is inferred as string and callback as a function that takes a number as argument
  setClientId: (idClient: number) => void;
}

export interface ClientToServerEvents {
  asd: () => undefined;
}

export interface InterServerEvents {
  getCard(): () => CCard;
  getCards(): () => CCard[];
  updateDashBoard(): (combinations: Combination[]) => void;
  setClientId: (idClient: number) => void;
}

export interface SocketData {
  name: string;
  age: number;
}
