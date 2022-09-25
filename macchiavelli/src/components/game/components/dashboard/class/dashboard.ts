import { CCard } from "../components/card/class/Card";
import { Combination } from "../components/combinations/class/Combinations";
import { IMove } from "../interfaces/dashboard";

export class MoveHistory {
  moves: IMove[];

  constructor(combinations: Combination[], cards: CCard[], hasThowCards: boolean) {
    this.moves = [{ combinations, cards, hasThowCards }];
  }

  addMove(combinations: Combination[], cards: CCard[], hasThowCards: boolean): void {
    this.moves.push({
      combinations: combinations.map((combination: Combination) => combination),
      cards: cards.map((card: CCard) => card),
      hasThowCards: hasThowCards
    });
  }

  undoMove(): IMove | undefined {
    if(this.moves.length > 1) {
      this.moves?.pop()
    }
    return this.moves[this.moves.length - 1];
  }
}