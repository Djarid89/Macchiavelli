import React from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from './class/Combinations';
import styles from './Combinations.module.scss';

interface Props {
  combinations: Combination[];
  attachCombination(combination: Combination): void;
  combine(card: CCard, combination: Combination): void
  throwDown(): void;
}

export const Combinations: React.FC<Props> = ({ combinations, attachCombination, combine, throwDown }: Props) => {
  const handleAttachCombination = (combination: Combination): void => {
    attachCombination(combination);
    combination.cards.forEach((card: CCard) => card.removeSelectedAndReady());
  }

  const handleCombine = (card: CCard, combination: Combination) => {
    combine(card, combination);
    if(combination.isAllCombinable(combination.cards)) {
      const selectedCardsNumber = combination.cards.reduce((sum: number, c: CCard) => c.selected ? sum + 1 : sum, 0);
      combination.cards.forEach((c: CCard) => c.ready = c.selected && combination.cards.length - selectedCardsNumber >= 3);
    } else {
      combination.cards.forEach((c: CCard) => c.ready = false);
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
                          attachCombination={ () => handleAttachCombination(combination) }
                          combine={ (c: CCard) => handleCombine(c, combination) }
                          throwDown={ throwDown }></Card>)
                }
              </span>
            )
          }
        </span>
      }
    </>
  );
}
