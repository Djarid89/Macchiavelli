import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';

interface Props {
  cards: CCard[];
  readOnly: boolean;
  moveCards(form: number, to: number): void;
  combine(card: CCard): void;
}

export const Hand: React.FC<Props> = ({ cards, readOnly, moveCards, combine }: Props) => {
  const [from, setFrom] = useState(0);

  const doMove = (to: number): void => {
    moveCards(from, to);
  }

  return (
    <>
        {
        cards.map((card: CCard, index: number) =>
          <Card key={ index + 1 }
                readOnly={readOnly}
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
