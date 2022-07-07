import React from 'react';
import styles from './Card.module.scss';
import { CCard } from './class/Card';

interface Props {
  card: CCard;
  index: number;
  moveFrom?(toIndex: number): void;
  doMove?(fromIndex: number): void;
  combine?(card: CCard): void;
  throwDown?(): void;
}

export const Card: React.FC<Props> = ({ card, index, moveFrom, doMove, combine, throwDown }: Props) => {
  const handleOnDragOver = (event: any): void => {
    event.stopPropagation();
    event.preventDefault();
  }

  const handleSetSwipeFrom = () => {
    if(moveFrom) {
      moveFrom(index);
    }
  }

  const handleDoSwipe = () => {
    if(doMove) {
      doMove(index);
    }
  }

  const handleClick = (e: any) => {
    if(e.ctrlKey) {
      if(card.ready && throwDown) {
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
            onDragStart={ handleSetSwipeFrom }
            onDragOver={ handleOnDragOver }
            onDrop={ handleDoSwipe }
            onClick={ (e: any) => handleClick(e) }>
        <div>{ card.number }</div>
        <div>{ card.seed }</div>
      </span>
    </>
  );
}
