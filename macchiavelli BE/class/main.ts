import { IPlayer, Seed } from "../interfaces/main";

export class Player {
  id: string;
  name: string;
  isMyTurn: boolean;
  cards: Card[];

  constructor(id: string, name: string, cards: Card[], isMyTurn = false) {
    this.id = id;
    this.name = name;
    this.isMyTurn = isMyTurn;
    this.cards = cards;
  }

  toIPlayer(): IPlayer {
    return { name: this.name, isMyTurn: this.isMyTurn, cards: this.cards};
  }
}

export class Card {
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
  cards: Card[];
  positionTop: number;
  positionLeft: number;
  zIndex: number;

  constructor(cards: Card[]) {
    this.id = 0;
    this.cards = cards;
    this.positionTop = 0;
    this.positionLeft = 0;
    this.zIndex = 0;
  }
}

export class Deck {
  cards: Card[] = [];

  constructor() {
    this.setCards();
    this.mixDecksCards();
  }

  setCards(): Card[] {
    this.cards = [];
    let cardId = 1;
    for(let number = 1; number <= 13; number++) {
      for(let seed = 0; seed < 4; seed++) {
        this.cards = this.cards.concat([new Card(cardId, number, seed), new Card(cardId + 1, number, seed)]);
        cardId += 2;
      }
    }
    return this.cards;
  }

  getCard(): Card {
    if(!this.cards.length) {
      this.setCards();
    }
    return this.cards.pop();
  }

  getCards(cardsNumber?: number): Card[] {
    const cards: Card[] = [];
    for(let i = 0; i < (cardsNumber || 12); i++) {
      const card = this.cards.pop();
      if(card) {
        cards.push(card);
      }
    }
    cards.sort((prev: Card, next: Card) => prev.number > next.number ? 1 : -1);
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