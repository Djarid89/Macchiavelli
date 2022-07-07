import React from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from './class/Combinations';
import styles from './Combinations.module.scss';

interface Props {
  combinations: Combination[];
  cardToAttach: CCard | undefined;
  removeCardFromHand(card: CCard): void;
}

export const Combinations: React.FC<Props> = ({ combinations, cardToAttach, removeCardFromHand: setCards }: Props) => {
  const handleAttachCard = (combination: Combination): void => {
    if(!cardToAttach) {
      return;
    }

    if(combination.isCardCombinable(cardToAttach)) {
      combination.cards = combination.cards.concat([cardToAttach]);
      combination.orderCards();
      setCards(cardToAttach);
      cardToAttach = undefined;
    }
  }

  return (
    <>
      {
        <span className={ styles.combinations }>
          {
            combinations.map((combination: Combination, index: number) =>
              <span className={ styles.cardContainer } key={ index }>
                {
                  combination.cards.map((card: CCard, index2: number) =>
                    <Card key={ index2 }
                          card={ card }
                          index={ index }
                          attachCard={ () => handleAttachCard(combination) }></Card>)
                }
              </span>
            )
          }
        </span>
      }
    </>
  );
}
