import { threadId } from "worker_threads";
import { CCard } from "../../dashboard/components/card/class/Card";

export class Player {
  name: string;
  isMyTurn: boolean;
  cards: CCard[];

  constructor(name: string) {
    this.name = name;
    this.isMyTurn = false;
    this.cards = [];
  }

  static get(players: Player[], playerName: string): Player {
    return players.find((player: Player) => player.name === playerName) as Player;
  }
}
