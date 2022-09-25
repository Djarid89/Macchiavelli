import { CCard } from "../components/card/class/Card";
import { Combination } from "../components/combinations/class/Combinations";

export interface IMove {
  combinations: Combination[];
  cards: CCard[];
  hasThowCards: boolean;
}