import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from '../combinations/class/Combinations';

interface Props {
  combinationId: number;
  cards: CCard[];
  setCards(cards: CCard[]): void;
  setCombinations(combination: Combination): void;
  setCardToAttach(cards: CCard): void;
}

export const Hand: React.FC<Props> = ({ combinationId, cards, setCards, setCombinations, setCardToAttach }: Props) => {
  const [combination, setCombination] = useState<Combination>(new Combination(combinationId, []));
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
    if(card.selected) {
      const toRemove = combination.cards.find((c: CCard) => c.id === card.id);
      if(toRemove) {
        card.selected = false;
        setCombination(new Combination(combinationId, combination.cards.filter((c: CCard) => c.id !== toRemove.id)));
      }
    } else if(combination.isCardCombinable(card)) {
      card.selected = true;
      setCombination(new Combination(combinationId, combination.cards.concat([card])));
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
    setCombination(new Combination(combinationId, []));
  }

  return (
    <>
        {
        cards.map((card: CCard, index: number) =>
          <Card key={ index + 1 }
                card={ card }
                index={ index }
                moveFrom={ moveFrom }
                setCardToAttach = { setCardToAttach }
                doMove={ doMove }
                combine={ handleCombine }
                throwDown={ handleThrowDown }></Card>
        )
      }
    </>
  );
}
