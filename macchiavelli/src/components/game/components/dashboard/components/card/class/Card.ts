import { Seed } from "../../combinations/interfaces/Combinations";

export class CCard {
  id: number;
  number: number;
  seed: Seed;
  selected: boolean;
  ready: boolean;
  ghost: boolean;

  constructor(id: number, number: number, seed: Seed, selected = false, ready = false, ghost = false) {
    this.id = id;
    this.number = number;
    this.seed = seed
    this.selected = selected;
    this.ready = ready;
    this.ghost = false;
  }
}
