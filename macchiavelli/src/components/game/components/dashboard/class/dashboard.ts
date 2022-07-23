import { CCard } from "../components/card/class/Card";
import { Combination } from "../components/combinations/class/Combinations";
import { IMove } from "../interfaces/dashboard";

export class MoveHistory {
  moves: IMove[];

  constructor(combinations: Combination[], cards: CCard[]) {
    this.moves = [{ combinations, cards }];
  }

  addMove(combinations: Combination[], cards: CCard[]): void {
    this.moves.push({
      combinations: combinations.map((combination: Combination) => combination),
      cards: cards.map((card: CCard) => card)
    });
  }

  undoMove(): IMove | undefined {
    if(this.moves.length > 1) {
      this.moves?.pop()
    }
    return this.moves[this.moves.length - 1];
  }
}