import React from 'react';
import { Card } from '../dashboard/components/card/Card';
import { CCard } from '../dashboard/components/card/class/Card';

interface Props {
  cards: CCard[];
}

export const Hand: React.FC<Props> = ({ cards }: Props) => {

  return (
    <>
      { cards.map((card: CCard, index: number) => <Card key={index} number={card.number} seed={card.seed}></Card>) }
    </>
  );
}
