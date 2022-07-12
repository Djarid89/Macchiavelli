import React, { useState } from 'react';
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
  const [isDragStarted, setIsDragStarted] = useState(false);

  const handleAttachCombination = (combination: Combination): void => {
    attachCombination(combination);
    combination.cards.forEach((card: CCard) => card.removeSelectedAndReady());
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
                          combine={ (c: CCard) => combine(c, combination) }
                          throwDown={ throwDown }
                          setDragIsStartedHere={ setIsDragStarted }
                          getDragIsStartedHere= { () => isDragStarted }></Card>)
                }
              </span>
            )
          }
        </span>
      }
    </>
  );
}
