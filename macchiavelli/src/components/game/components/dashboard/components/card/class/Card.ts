import { Seed } from "../../combinations/interfaces/Combinations";

export class CCard {
  id: number;
  number: number;
  seed: Seed;
  selected: boolean;

  constructor(id: number, number: number, seed: Seed, selected = false) {
    this.id = id;
    this.number = number;
    this.seed = seed
    this.selected = selected;
  }
}
