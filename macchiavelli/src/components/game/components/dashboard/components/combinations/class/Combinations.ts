import { CCard } from "../../card/class/Card";

export class Combination {
  id: number;
  cards: CCard[];

  constructor(cards: CCard[]) {
    this.id = 0;
    this.cards = cards;
    this.cards.forEach((card: CCard) => card.ready = cards.length >= 3);
  }

  isCardCombinable(card: CCard, cards?: CCard[]): boolean {
    const cardsToCheck = cards || this.cards;
    if(!cardsToCheck.length) {
      return true;
    }

    const isSameSeed = cardsToCheck.every((c: CCard) => c.seed === card.seed);
    if(isSameSeed) {
      const lower = cardsToCheck.reduce((min: number, c: CCard) => c.number < min ? c.number : min, 13);
      let highest = 0;
      let maxReached = false;
      for(const c of cardsToCheck) {
        if(highest === 13 && c.number === 1) {
          maxReached = true;
          break
        } else if(c.number > highest) {
          highest = c.number;
        }
      }
      return this.checkInferiorLimit(card, lower) || this.checkSuperiorLimit(card, highest, maxReached);
    } else {
      return cardsToCheck.every((c: CCard) => c.number === card.number) && !cardsToCheck.some((c: CCard) => c.seed === card.seed) && cardsToCheck.length < 4;
    }
  }

  orderCards(cards: CCard[]): CCard[] {
    const isSameSeed = cards?.every((c: CCard) => c.seed === cards[0].seed) || false;
    if(!isSameSeed) {
      return cards;
    }

    const one = cards.find((card: CCard) => card.number === 1);
    if(one) {
      cards.splice(cards.findIndex((card: CCard) => card.number === 1), 1);
      cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
      if(cards.some((card: CCard) => card.number === 2)) {
        cards.unshift(one);
      } else if(cards.some((card: CCard) => card.number === 13)) {
        cards.push(one);
      }
    } else {
      cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
    }

    return cards;
  }

  private checkInferiorLimit(card: CCard, lower: number): boolean {
    return lower > 1 && card.number === lower - 1;
  }

  private checkSuperiorLimit(card: CCard, highest: number, maxReached: boolean): boolean {
    return !maxReached && ((highest < 13 && card.number === highest + 1) || (highest === 13 && card.number === 1));
  }

  // isCardRemovable(): boolean {
  //   const numberOfCardsSelected = this.cards.reduce((sum: number, card: CCard) => card.selected ? sum + 1 : sum, 0);
  //   return this.cards.length - numberOfCardsSelected > 3;
  // }

  isAllCombinable(cards: CCard[]): boolean {
    if(cards.length < 3) {
      return false;
    }
    const orderedCards: CCard[] = this.orderCards(cards.map((card: CCard) => card));
    const incrementaCards: CCard[] = [];
    for(const card of orderedCards) {
      if(incrementaCards.length && !this.isCardCombinable(card, incrementaCards)) {
        return false;
      }
      incrementaCards.push(card);
    }
    return true;
  }
}
