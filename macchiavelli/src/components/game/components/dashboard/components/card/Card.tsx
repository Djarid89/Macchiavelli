import React from 'react';
import styles from './Card.module.scss';
import { CCard } from './class/Card';

interface Props {
  card: CCard;
  index: number;
  isCombinationSelected?: boolean;
  moveCardFrom?(toIndex: number): void;
  moveCardTo?(fromIndex: number): void;
  attachCombination?(): void;
  combine?(card: CCard): void;
  throwDown?(): void;
  setCardDragIsStarted(isStartHere: boolean): void;
  getCardDragIsStarted(): boolean;
}

export const Card: React.FC<Props> = ({ card,
                                        index,
                                        isCombinationSelected,
                                        moveCardFrom,
                                        moveCardTo,
                                        attachCombination,
                                        combine,
                                        throwDown,
                                        setCardDragIsStarted,
                                        getCardDragIsStarted }: Props) => {
  const handleOnDragOver = (e: any): void => {
    if(isCombinationSelected) {
      return;
    }
    if(combine && e.shiftKey && !card.selected && getCardDragIsStarted()) {
      combine(card);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDragStart = () => {
    if(isCombinationSelected) {
      return;
    }
    if(moveCardFrom) {
      moveCardFrom(index);
    }
    if(combine && !card.selected) {
      combine(card);
    }
    setCardDragIsStarted(true);
  }

  const handleOnDrop = (e: any) => {
    if(e.shiftKey || isCombinationSelected) {
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
    if(e.ctrlKey) {
      if(throwDown) {
        throwDown();
      }
    } else if(combine) {
      combine(card);
    }
  }

  return (
    <>
      <span className={ `${styles.card} ${card.selected ? styles.selected : ''} ${card.ready ? styles.ready : ''}` }
            draggable
            style={{ zIndex: index, border: isCombinationSelected ? '2px solid red' : '' }}
            onDragStart={ handleDragStart }
            onDragOver={ handleOnDragOver }
            onDragEnd={ () => setCardDragIsStarted(true) }
            onDrop={ (e: any) => handleOnDrop(e) }
            onClick={ (e: any) => handleClick(e) }>
        <div>{ card.number }</div>
        <div>{ card.seed }</div>
      </span>
    </>
  );
}
