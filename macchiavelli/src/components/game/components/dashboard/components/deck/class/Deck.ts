import { CCard } from "../../card/class/Card";

export class CDeck {
  cards: CCard[] = [];

  constructor() {
    this.setCards();
    this.mixDecksCards();
  }

  setCards(): CCard[] {
    this.cards = [];
    let cardId = 1;
    // for(let number = 1; number <= 13; number++) {
    //   for(let seed = 0; seed < 4; seed++) {
    //     this.cards = this.cards.concat([new CCard(cardId, number, seed), new CCard(cardId + 1, number, seed)]);
    //     cardId += 2;
    //   }
    // }
    this.cards.push(new CCard(1, 1, 0));
    this.cards.push(new CCard(2, 2, 0));
    this.cards.push(new CCard(3, 3, 0));
    this.cards.push(new CCard(4, 4, 0));
    this.cards.push(new CCard(5, 5, 0));
    this.cards.push(new CCard(6, 6, 0));
    this.cards.push(new CCard(7, 7, 0));
    this.cards.push(new CCard(8, 8, 0));
    this.cards.push(new CCard(9, 9, 0));
    this.cards.push(new CCard(10, 10, 0));
    this.cards.push(new CCard(11, 11, 0));
    this.cards.push(new CCard(12, 12, 0));
    this.cards.push(new CCard(13, 13, 0));
    this.cards.push(new CCard(14, 1, 0));
    return this.cards;
  }

  getCard(): CCard {
    if(!this.cards.length) {
      this.setCards();
    }
    return this.cards.pop() as CCard;
  }

  getCards(cardsNumber?: number): CCard[] {
    const cards: CCard[] = [];
    for(let i = 0; i < (cardsNumber || 52); i++) {
      const card = this.cards.pop();
      if(card) {
        cards.push(card);
      }
    }
    return cards;
  }

  private mixDecksCards(): void {
    let currentIndex = this.cards.length
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
    }
  }
}
