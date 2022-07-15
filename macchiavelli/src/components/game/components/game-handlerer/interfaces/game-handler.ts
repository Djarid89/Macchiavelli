export class Client {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
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