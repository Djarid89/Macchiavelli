import React from 'react';
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
  let from: number;

  const moveFrom = (indexFrom: number): void => {
    from = indexFrom;
  }

  const doMove = (swipeTo: number): void => {
    const cardToMove = new CCard(cards[from].id, cards[from].number, cards[from].seed, cards[from].selected, cards[from].ready);
    cards.splice(from, 1);
    cards.splice(swipeTo, 0, cardToMove);
    setCards(cards.map((card: CCard) => card));
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
                moveFrom={ moveFrom }
                doMove={ doMove }
                combine={ (c: CCard) => handleCombine(c) }
                throwDown={ throwDown }></Card>
        )
      }
    </>
  );
}
