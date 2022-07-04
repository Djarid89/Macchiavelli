import { CCard } from "../../card/class/Card";
import { Seed } from "../../cards/interfaces/Card";

export class CDeck {
  cards: CCard[];

  constructor() {
    this.cards = [];
    const seeds = [
      { seed: Seed.Hearts, occurrence: 0 },
      { seed: Seed.Tiles, occurrence: 0 },
      { seed: Seed.Clovers, occurrence: 0 },
      { seed: Seed.Pikes, occurrence: 0 }
    ];
    for(let index = 0; index < 104; index++) {
      let randomSeed = seeds[Math.floor(Math.random() * 3)];

    }
  }
}
