import React from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';

interface Props {
  cards: CCard[];
  setCards(cards: CCard[]): void;
}

export interface Swipe {
  from: number;
  to: number;
}

export const Hand: React.FC<Props> = ({ cards, setCards }: Props) => {
  let swipeFrom: number;

  const setSwipeFrom = (indexFrom: number): void => {
    swipeFrom = indexFrom;
  }

  const doSwipe = (swipeTo: number): void => {
    [cards[swipeFrom], cards[swipeTo]] = [cards[swipeTo], cards[swipeFrom]];
    setCards(cards.map((card: CCard) => card));
  }

  return (
    <>
      {
        cards.map((card: CCard, index: number) =>
          <Card key={ index }
                number={ card.number }
                seed={ card.seed }
                index={ index }
                setSwipeFrom={ (toIndex: number) => setSwipeFrom(toIndex) }
                doSwipe={ (fromIndex: number) => doSwipe(fromIndex) }></Card>)
      }
    </>
  );
}
