import { CCard } from "../../dashboard/components/card/class/Card";

export class Player {
  name: string;
  cards: CCard[];
  isMyTurn: boolean;

  constructor(name: string, cards: CCard[] = [], isMyTurn = false) {
    this.name = name;
    this.cards = cards;
    this.isMyTurn = isMyTurn;
  }

  static get(players: Player[], playerName: string): Player | undefined {
    if(!players) {
      return;
    }
    return players.find((player: Player) => player.name === playerName);
  }
}
