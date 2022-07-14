import React from 'react';
import styles from './Card.module.scss';
import { CCard } from './class/Card';

function importAll(r: any) {
  const result: any = {};
   r.keys().forEach((item: any, index: number) => result[item.replace('./', '')] = r(item));
  return result
 }
 const images = importAll(require.context('../../../../../../assets', false, /\.(png|jpe?g|svg)$/));

interface Props {
  card: CCard;
  index: number;
  isCombinationSelected?: boolean;
  moveCardFrom?(toIndex: number): void;
  moveCardTo?(fromIndex: number): void;
  attachCombination?(): void;
  combine?(card: CCard): void;
}

export const Card: React.FC<Props> = ({ card,
                                        index,
                                        isCombinationSelected,
                                        moveCardFrom,
                                        moveCardTo,
                                        attachCombination,
                                        combine }: Props) => {
  const handleOnDragOver = (e: any): void => {
    if(isCombinationSelected) {
      return;
    }
    if(combine && e.altKey && !card.selected) {
      combine(card);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDragStart = (e: any) => {
    if(isCombinationSelected || e.shiftKey) {
      return;
    }
    if(moveCardFrom) {
      moveCardFrom(index);
    }
    if(combine && !card.selected) {
      combine(card);
    }
  }

  const handleOnDrop = (e: any) => {
    if(e.altKey || isCombinationSelected) {
      return;
    }
    if(moveCardTo) {
      moveCardTo(index);
    } else if(attachCombination) {
      attachCombination();
    }
  }

  const handleClick = (e: any) => {
    if(isCombinationSelected) {
      return;
    }
    if(combine) {
      combine(card);
    }
  }

  return (
    <>
      <span className={ `${styles.card} ${card.selected ? styles.selected : ''}` }
            draggable
            style={{ zIndex: index }}
            onDragStart={ (e: any) => handleDragStart(e) }
            onDragOver={ handleOnDragOver }
            onDrop={ (e: any) => handleOnDrop(e) }
            onClick={ (e: any) => handleClick(e) }>
        <img src={ images[`${card.number}_${card.seed}.svg`] } alt='mySvgImage' />
      </span>
    </>
  );
}
