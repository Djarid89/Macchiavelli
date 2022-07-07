import { CCard } from "../../card/class/Card";

export class CCombinations {
  id: number;
  cards: CCard[];

  constructor(id: number, cards: CCard[]) {
    this.id = id;
    this.cards = cards;
    this.cards.forEach((c: CCard) => c.ready = this.cards.length >= 3);
  }

  isCardCombinable(card: CCard): boolean {
    if(!this.cards.length) {
      return true;
    }

    const isSameSeed = this.cards.every((c: CCard) => c.seed === card.seed);
    if(isSameSeed) {
      const lower = this.cards.reduce((min: number, c: CCard) => c.number < min ? c.number : min, 13);
      let highest = 0;
      let maxReached = false;
      for(const c of this.cards) {
        if(highest === 13 && c.number === 1) {
          maxReached = true;
          break
        } else if(c.number > highest) {
          highest = c.number;
        }
      }
      return this.checkInferiorLimit(card, lower) || this.checkSuperiorLimit(card, highest, maxReached);
    } else {
      return this.cards.every((c: CCard) => c.number === card.number) && !this.cards.some((c: CCard) => c.seed === card.seed) && this.cards.length < 4;
    }
  }

  orderCards(): void {
    const isSameSeed = this.cards?.every((c: CCard) => c.seed === this.cards[0].seed) || false;
    if(!isSameSeed) {
      return;
    }

    const one = this.cards.find((card: CCard) => card.number === 1);
    if(one) {
      this.cards.splice(this.cards.findIndex((card: CCard) => card.number === 1), 1);
      this.cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
      if(this.cards.some((card: CCard) => card.number === 2)) {
        this.cards.unshift(one);
      } else if(this.cards.some((card: CCard) => card.number === 13)) {
        this.cards.push(one);
      }
    } else {
      this.cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
    }
  }

  private checkInferiorLimit(card: CCard, lower: number): boolean {
    return lower > 1 && card.number === lower - 1;
  }

  private checkSuperiorLimit(card: CCard, highest: number, maxReached: boolean): boolean {
    return !maxReached && ((highest < 13 && card.number === highest + 1) || (highest === 13 && card.number === 1));
  }
}
