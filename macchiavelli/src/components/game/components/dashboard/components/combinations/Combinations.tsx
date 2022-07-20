import React, { useState } from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { Combination } from './class/Combinations';
import styles from './Combinations.module.scss';

interface Props {
  combinations: Combination[];
  readOnly: boolean;
  attachCombination(combination: Combination): void;
  combine(card: CCard, combination: Combination): void;
  unsetCombination(): void;
  onDraggedCombination(combination: Combination): void;
}

export const Combinations: React.FC<Props> = ({ combinations, readOnly, attachCombination, combine, unsetCombination, onDraggedCombination }: Props) => {
  const handleOnDragStart = (e: any, combination: Combination): void => {
    if(!e.shiftKey) {
      return;
    } else {
      combination.cards.forEach((card: CCard) => card.selected = false);
      unsetCombination();
      combination.isDragged = true;
      onDraggedCombination(combination);
    }
    combination.zIndex = 14;
  }

  return (
    <>
      {
        combinations.map((combination: Combination, index: number) =>
          <span className={ styles.combination }
                style={{ zIndex: combination.isDragged ? 14 : 0, top: combination.positionTop, left: combination.positionLeft }}
                onDragStart={ (e: any) => handleOnDragStart(e, combination) }
                key={ index }>
            {
              combination.cards.map((card: CCard, index2: number) =>
                <Card key={ index2 }
                      isCombinationSelected={ combination.isDragged }
                      readOnly={ readOnly }
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
