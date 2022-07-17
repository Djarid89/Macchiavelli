import { Seed } from "../interfaces/main";

export class Player {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

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

export class Combination {
  id: number;
  cards: CCard[];
  positionTop: number;
  positionLeft: number;
  zIndex: number;

  constructor(cards: CCard[]) {
    this.id = 0;
    this.cards = cards;
    this.positionTop = 0;
    this.positionLeft = 0;
    this.zIndex = 0;
  }
}