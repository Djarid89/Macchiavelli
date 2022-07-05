import { CCard } from "../../card/class/Card";

export class CDeck {
  cards: CCard[] = [];

  constructor() {
    this.setCards();
    this.mixDecksCards();
  }

  setCards(): CCard[] {
    this.cards = [];
    for(let number = 1; number <= 13; number++) {
      for(let seed = 0; seed < 4; seed++) {
        this.cards = this.cards.concat([new CCard(number, seed), new CCard(number, seed)]);
      }
    }
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
    for(let i = 0; i < (cardsNumber || 12); i++) {
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
