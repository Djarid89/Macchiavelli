import React, { useState } from 'react';
import { Player } from '../game-handlerer/class/game-handler';
import { CCard } from './components/card/class/Card';
import { Combination } from './components/combinations/class/Combinations';
import { Combinations } from './components/combinations/Combinations';
import { Deck } from './components/deck/Deck';
import { Hand } from './components/Hand/Hand';
import styles from './Dashboard.module.scss';

interface Props {
  players: Player[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  const [cards, setCards] = useState<CCard[]>([]);
  const [combination, setCombination] = useState<Combination>(new Combination([]));
  const [combinations, setCombinations] = useState<Combination[]>([]);
  let isOnAttach = false;

  const handleCombine = (card: CCard): void => {
    let combCards: CCard[] = combination.cards;
    if(card.selected) {
      card.selected = false;
      const toRemove = combination.cards.find((c: CCard) => c.id === card.id);
      if(toRemove) {
        toRemove.selected = false;
        combCards = combination.cards.filter((c: CCard) => c.id !== toRemove.id);
      }
      setCombination(new Combination(combCards));
    } else {
      card.selected = true;
      combCards = combination.cards.concat([new CCard(card.id, card.number, card.seed, card.selected)]);
      setCombination(new Combination(combCards));
    }
  }

  const handleThrowDown = (e?: any): void => {
    if(e.altKey) {
      return;
    }

    if(isOnAttach) {
      isOnAttach = false;
      return;
    }

    if(e) {
      combination.positionTop = e.clientY - e.target.offsetTop - 125;
      combination.positionLeft = e.clientX - e.target.offsetLeft;
    }
    combination.cards = Combination.orderCards(combination.cards);
    combination.id = combinations.length + 1;
    combination.cards.forEach((card: CCard) => card.selected = false);
    const newCombinations = combinations.concat([combination.copyCombination()]);
    newCombinations.forEach((comb: Combination) => comb.cards = comb.cards.filter((card: CCard) => !card.selected));
    setCombinations(newCombinations.filter((comb: Combination) => comb.cards.length));
    setCards(cards.filter((card: CCard) => !card.selected));
    combination.cards.forEach((card: CCard) => card.selected = false);
    setCombination(new Combination([]));
  }

  const handleAttachCombination = (combinationToModify: Combination): void => {
    isOnAttach = true;
    if(!combination.isAllCombinable(combination.cards.concat(combinationToModify.cards || []))) {
      return;
    }
    combinationToModify.cards = Combination.orderCards(combinationToModify.cards.concat(combination.cards));
    combinationToModify.cards.forEach((card: CCard) => card.selected = false);
    combinations.forEach((comb: Combination) => {
      if(comb.id !== combinationToModify.id) {
        comb.cards = comb.cards.filter((card: CCard) => !card.selected);
      }
    });
    setCombinations(combinations.filter((comb: Combination) => comb.cards.length));
    setCards(cards.filter((card: CCard) => !card.selected));
    setCombination(new Combination([]));
  }

  const handleOrderCard = (): void => {
    cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
    setCards(cards.map((card: CCard) => card));
  }

  const handleDroppable = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((player: Player, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer } onDrop={ (e: any) => handleThrowDown(e) } onDragOver={ handleDroppable } onDragEnter={ handleDroppable }>
          <Combinations combinations={ combinations }
                        combine={ handleCombine }
                        attachCombination={ (combinationToAttach: Combination) => handleAttachCombination(combinationToAttach) }
                        unsetCombination={ () => setCombination(new Combination([])) }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck setCards={ setCards } addCard={ (cardToAdd: CCard) => { setCards(cards.concat([cardToAdd])) } }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <div className={ styles.dashboardButtonOrder }>
            <button onClick={ handleOrderCard }>Ordina</button>
          </div>
          <div className={ styles.dashboardHand }>
            <Hand cards={ cards } setCards={ setCards } combine={ handleCombine }></Hand>
          </div>
          <div className={ styles.dashboardButtonPass }>
            <button>Passo</button>
          </div>
        </div>
      </div>
    </>
  );
}
