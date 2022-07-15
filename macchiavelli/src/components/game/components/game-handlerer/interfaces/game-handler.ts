import { CCard } from "../../dashboard/components/card/class/Card";
import { Combination } from "../../dashboard/components/combinations/class/Combinations";

export class Client {
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}


export interface ServerToClientEvents {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void; a is inferred as number, b as string and c as buffer
  // withAck: (d: string, callback: (e: number) => void) => void; d is inferred as string and callback as a function that takes a number as argument
  asd: () => undefined;
}

export interface ClientToServerEvents {
  asd: () => undefined;
}