import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from './class/Combinations';
import styles from './Combinations.module.scss';

interface Props {
  combinations: Combination[];
  attachCombination(combination: Combination): void;
  combine(card: CCard, combination: Combination): void;
  unsetCombination(): void;
}

export const Combinations: React.FC<Props> = ({ combinations, attachCombination, combine, unsetCombination }: Props) => {
  const [isCombinationSelected, setIsCombinationSelected] = useState(false);

  const handleDragEnd = (e: any, combination: Combination) => {
    if(!isCombinationSelected) {
      return;
    }
    combination.positionTop = e.clientY - e.target.offsetTop - 125;
    combination.positionLeft = e.clientX - e.target.offsetLeft;
    setIsCombinationSelected(false);
  }

  const handleOnDragStart = (e: any, combination: Combination): void => {
    if(!e.shiftKey) {
      return;
    } else {
      combination.cards.forEach((card: CCard) => card.selected = false);
      unsetCombination();
    }
    setIsCombinationSelected(!isCombinationSelected);
    combination.zIndex = isCombinationSelected ? 14 : 0;
  }

  return (
    <>
      {
        combinations.map((combination: Combination, index: number) =>
          <span className={ styles.combination }
                style={{ zIndex: isCombinationSelected ? 14 : 0, top: combination.positionTop, left: combination.positionLeft }}
                onDragEnd={ (e: any) => handleDragEnd(e, combination) }
                onDragStart={ (e: any) => handleOnDragStart(e, combination) }
                key={ index }>
            {
              combination.cards.map((card: CCard, index2: number) =>
                <Card key={ index2 }
                      isCombinationSelected={isCombinationSelected}
                      card={ card }
                      index={ index2 }
                      attachCombination={ () => attachCombination(combination) }
                      combine={ (c: CCard) => combine(c, combination) }></Card>)
            }
          </span>
        )
      }
    </>
  );
}
