import { CCard } from "../../dashboard/components/card/class/Card";

export class Player {
  id: number;
  name: string;
  cards: CCard[];
  isMyTurn: boolean;

  constructor(id: number, name: string, cards: CCard[] = [], isMyTurn = false) {
    this.id = id;
    this.name = name;
    this.cards = cards;
    this.isMyTurn = isMyTurn;
  }
}
