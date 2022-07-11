import React, { useState } from 'react';
import { CCard } from './components/card/class/Card';
import { Combination } from './components/combinations/class/Combinations';
import { Combinations } from './components/combinations/Combinations';
import { IPlayer } from './components/combinations/interfaces/Combinations';
import { Deck } from './components/deck/Deck';
import { Hand } from './components/Hand/Hand';
import styles from './Dashboard.module.scss';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  const [cards, setCards] = useState<CCard[]>([]);
  const [combination, setCombination] = useState<Combination>(new Combination([]));
  const [combinations, setCombinations] = useState<Combination[]>([]);

  const handleCombine = (card: CCard, combinationToCheck?: Combination): void => {
    let combCards: CCard[] = [];
    if(card.selected) {
      card.selected = false;
      if(combinationToCheck?.isCardRemovable() === false) {
        return;
      }
      const toRemove = combination.cards.find((c: CCard) => c.id === card.id);
      if(toRemove) {
        toRemove.removeSelectedAndReady();
        combCards = combination.cards.filter((c: CCard) => c.id !== toRemove.id);
        setCombination(new Combination(combCards));
      }
    } else {
      card.selected = true;
      combCards = combination.cards.concat([new CCard(card.id, card.number, card.seed, card.selected, card.ready)]);
      setCombination(new Combination(combCards));
    }
  }

  const handleThrowDown = (): void => {
    combination.cards = combination.orderCards(combination.cards);
    combination.id = combinations.length + 1;
    combination.cards.forEach((card: CCard) => card.removeSelectedAndReady());
    // Ready reset
    setCards(cards.filter((card: CCard) => !card.selected));
    combinations.forEach((comb: Combination) => comb.cards.forEach((card: CCard) => card.removeSelectedAndReady()));
    setCombinations(combinations.concat([combination]));
    setCombination(new Combination([]));
  }

  const handleAttachCombination = (combinationToAttach: Combination): void => {
    combination.cards.forEach((card: CCard) => {
      if(combinationToAttach.isCardCombinable(card)) {
        combinationToAttach.cards = combinationToAttach.orderCards(combinationToAttach.cards.concat([card]));
      }
    })
    setCards(cards.filter((card: CCard) => !card.selected));
    combinations.forEach((comb: Combination) => comb.cards.forEach((card: CCard) => card.removeSelectedAndReady()));
    setCombination(new Combination([]));
  }

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((player: IPlayer, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer }>
          <Combinations combinations={ combinations }
                        combine={ handleCombine }
                        throwDown= { handleThrowDown }
                        attachCombination={ (combinationToAttach: Combination) => handleAttachCombination(combinationToAttach) }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck setCards={ setCards } addCard={ (cardToAdd: CCard) => { setCards(cards.concat([cardToAdd])) } }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <div className={ styles.dashboardHand }>
            <Hand cards={ cards }
                  setCards={ setCards }
                  combine={ handleCombine }
                  throwDown={ handleThrowDown }></Hand>
          </div>
          <div className={ styles.dashboardButton }>
            <button>Passo</button>
          </div>
        </div>
      </div>
    </>
  );
}
