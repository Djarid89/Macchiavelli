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
  const [isCardDragStarted, setCardIsDragStarted] = useState(false);
  const [isCombinationSelected, setIsCombinationSelected] = useState(false);
  const [style, setStyle] = useState({ top: 0, left: 0, zIndex: 0 });

  const handleAttachCombination = (combination: Combination): void => {
    attachCombination(combination);
    combination.cards.forEach((card: CCard) => card.removeSelectedAndReady());
  }

  const handleDragEnd = (e: any) => {
    if(!isCombinationSelected) {
      return;
    }
    setStyle({ top: e.clientY - e.target.offsetTop - 125, left: e.clientX - e.target.offsetLeft, zIndex: style.zIndex });
    setIsCombinationSelected(false);
  }

  const handleOnDoubleClick = (): void => {
    setIsCombinationSelected(!isCombinationSelected);
    setStyle({ top: style.top, left: style.left, zIndex: isCombinationSelected ? 14 : 0 });
  }

  return (
    <>
      {
        <span className={ styles.combinations }
              draggable
              style={ style }
              onDragEnd={ handleDragEnd }
              onDoubleClick={ handleOnDoubleClick }>
          {
            combinations.map((combination: Combination, index: number) =>
              <span className={ styles.cardContainer } key={ index }>
                {
                  combination.cards.map((card: CCard, index2: number) =>
                    <Card key={ index2 }
                          isCombinationSelected={isCombinationSelected}
                          card={ card }
                          index={ index }
                          attachCombination={ () => handleAttachCombination(combination) }
                          combine={ (c: CCard) => combine(c, combination) }
                          throwDown={ throwDown }
                          setCardDragIsStarted={ setCardIsDragStarted }
                          getCardDragIsStarted= { () => isCardDragStarted }></Card>)
                }
              </span>
            )
          }
        </span>
      }
    </>
  );
}
