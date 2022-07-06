import { Seed } from "../../combinations/interfaces/Combinations";

export class CCard {
  id: number;
  number: number;
  seed: Seed;
  selected: boolean;
  ready: boolean;

  constructor(id: number, number: number, seed: Seed) {
    this.id = id;
    this.number = number;
    this.seed = seed
    this.selected = false;
    this.ready = false;
  }
}
