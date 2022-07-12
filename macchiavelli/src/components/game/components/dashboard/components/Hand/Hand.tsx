import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from '../combinations/class/Combinations';

interface Props {
  cards: CCard[];
  setCards(cards: CCard[]): void;
  combine(card: CCard): void;
  throwDown(): void
}

export const Hand: React.FC<Props> = ({ cards, setCards, combine, throwDown }: Props) => {
  const [from, setFrom] = useState(0);
  const [isCardDragStarted, setIsCardDragStarted] = useState(false);

  const doMove = (swipeTo: number): void => {
    const card = cards[from];
    if(!card) {
      return;
    }

    const cardToMove = new CCard(card.id, card.number, card.seed, card.selected, card.ready);
    cards.splice(from, 1);
    cards.splice(swipeTo, 0, cardToMove);
    setCards(cards.map((c: CCard) => c));
  }

  const handleCombine = (card: CCard): void => {
    combine(card);
    const selectedCards = cards.filter((c: CCard) => c.selected);
    if(new Combination(selectedCards).isAllCombinable(selectedCards)) {
      cards.forEach((c: CCard) => c.ready = c.selected);
    } else {
      cards.forEach((c: CCard) => c.ready = false);
    }
  }

  return (
    <>
        {
        cards.map((card: CCard, index: number) =>
          <Card key={ index + 1 }
                card={ card }
                index={ index }
                moveCardFrom= { setFrom }
                moveCardTo={ doMove }
                combine={ (c: CCard) => handleCombine(c) }
                throwDown={ throwDown }
                setCardDragIsStarted={ setIsCardDragStarted }
                getCardDragIsStarted= { () => isCardDragStarted }></Card>
        )
      }
    </>
  );
}
