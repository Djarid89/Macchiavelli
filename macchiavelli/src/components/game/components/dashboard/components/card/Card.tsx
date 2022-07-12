import React from 'react';
import styles from './Card.module.scss';
import { CCard } from './class/Card';

interface Props {
  card: CCard;
  index: number;
  moveFrom?(toIndex: number): void;
  doMove?(fromIndex: number): void;
  attachCombination?(): void;
  combine?(card: CCard): void;
  throwDown?(): void;
  setDragIsStartedHere(isStartHere: boolean): void;
  getDragIsStartedHere(): boolean;
}

export const Card: React.FC<Props> = ({ card, index, moveFrom, doMove, attachCombination, combine, throwDown, setDragIsStartedHere, getDragIsStartedHere }: Props) => {
  const handleOnDragOver = (e: any): void => {
    if(combine && e.shiftKey && !card.selected && getDragIsStartedHere()) {
      combine(card);
    }
    e.stopPropagation();
    e.preventDefault();
  }

  const handleDragStart = () => {
    if(moveFrom) {
      moveFrom(index);
    }
    if(combine && !card.selected) {
      combine(card);
    }
    setDragIsStartedHere(true);
  }

  const handleOnDrop = (e: any) => {
    if(e.shiftKey) {
      return;
    }
    if(doMove) {
      doMove(index);
    } else if(attachCombination) {
      attachCombination();
    }
  }

  const handleClick = (e: any) => {
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
            style={{ zIndex: index }}
            draggable
            onDragStart={ handleDragStart }
            onDragOver={ handleOnDragOver }
            onDragEnd={ () => setDragIsStartedHere(true) }
            onDrop={ (e: any) => handleOnDrop(e) }
            onClick={ (e: any) => handleClick(e) }>
        <div>{ card.number }</div>
        <div>{ card.seed }</div>
      </span>
    </>
  );
}
