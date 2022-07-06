import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { CCombinations } from '../combinations/class/Combinations';

interface Props {
  combinationId: number;
  cards: CCard[];
  setCards(cards: CCard[]): void;
  setCombinations(combination: CCombinations): void
}

export const Hand: React.FC<Props> = ({ combinationId, cards, setCards, setCombinations }: Props) => {
  const [combination, setCombination] = useState<CCombinations>(new CCombinations(combinationId, []));
  let swipeFrom: number;

  const setSwipeFrom = (indexFrom: number): void => {
    swipeFrom = indexFrom;
  }

  const doSwipe = (swipeTo: number): void => {
    [cards[swipeFrom], cards[swipeTo]] = [cards[swipeTo], cards[swipeFrom]];
    setCards(cards.map((card: CCard) => card));
  }

  const handleCombine = (card: CCard): void => {
    if(card.selected) {
      const toRemove = combination.cards.find((c: CCard) => c.id === card.id);
      if(toRemove) {
        card.selected = false;
        setCombination(new CCombinations(combinationId, combination.cards.filter((c: CCard) => c.id !== toRemove.id)));
      }
    } else if(combination.isCardCombinable(card)) {
      card.selected = true;
      setCombination(new CCombinations(combinationId, combination.cards.concat([card])));
    }
  }

  const handleThrowDown = (): void => {
    combination.cards.forEach((c: CCard) => {
      c.selected = false;
      c.ready = false;
    });
    setCards(cards.filter((c: CCard) => !combination.cards.find((cardCombination: CCard) => cardCombination.id === c.id)));
    combination.orderCards();
    setCombinations(combination);
    setCombination(new CCombinations(combinationId, []));
  }

  return (
    <>
      {
        cards.map((card: CCard, index: number) =>
          <Card key={ index }
                card={ card }
                index={ index }
                setSwipeFrom={ (toIndex: number) => setSwipeFrom(toIndex) }
                doSwipe={ (fromIndex: number) => doSwipe(fromIndex) }
                combine={ handleCombine }
                throwDown={ handleThrowDown }></Card>
        )
      }
    </>
  );
}
