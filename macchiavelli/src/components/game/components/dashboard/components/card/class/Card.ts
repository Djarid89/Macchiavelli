import { Seed } from "../../cards/interfaces/Card";

export class CCard {
  number: number;
  seed: Seed;

  constructor(number: number, seed: Seed) {
    this.number = number;
    this.seed = seed
  }
}
