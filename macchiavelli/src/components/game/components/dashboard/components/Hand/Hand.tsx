import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';

interface Props {
  cards: CCard[];
  setCards(cards: CCard[]): void;
  combine(card: CCard): void;
}

export const Hand: React.FC<Props> = ({ cards, setCards, combine }: Props) => {
  const [from, setFrom] = useState(0);
  const [isCardDragStarted, setIsCardDragStarted] = useState(false);

  const doMove = (swipeTo: number): void => {
    const card = cards[from];
    if(!card) {
      return;
    }

    const cardToMove = new CCard(card.id, card.number, card.seed, card.selected);
    cards.splice(from, 1);
    cards.splice(swipeTo, 0, cardToMove);
    setCards(cards.map((c: CCard) => c));
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
                combine={ combine }></Card>
        )
      }
    </>
  );
}
