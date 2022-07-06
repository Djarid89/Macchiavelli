import React from 'react';
import styles from './Card.module.scss';
import { CCard } from './class/Card';

interface Props {
  card: CCard;
  index: number;
  setSwipeFrom?(toIndex: number): void;
  doSwipe?(fromIndex: number): void;
  combine?(card: CCard): void;
  throwDown?(): void;
}

export const Card: React.FC<Props> = ({ card, index, setSwipeFrom, doSwipe, combine, throwDown }: Props) => {
  const stopEventStopPropagation = (event: any): void => {
    event.stopPropagation();
    event.preventDefault();
  }

  const handleSetSwipeFrom = (value: number) => {
    if(setSwipeFrom) {
      setSwipeFrom(value);
    }
  }

  const handleDoSwipe = (value: number) => {
    if(doSwipe) {
      doSwipe(value);
    }
  }

  const handleCombine = () => {
    if(combine) {
      combine(card);
    }
  }

  const handleThrowDown = () => {
    if(card.ready && throwDown) {
      throwDown();
    }
  }

  return (
    <>
      <span className={ `${styles.card} ${card.selected ? styles.selected : ''} ${card.ready ? styles.ready : ''}` }
            style={{ zIndex: index }}
            draggable
            onDragStart={ () => handleSetSwipeFrom(index) }
            onDragOver={ stopEventStopPropagation }
            onDrop={ () => handleDoSwipe(index) }
            onClick={ () => handleCombine() }
            onDoubleClick={ handleThrowDown }>
        <div>{ card.number }</div>
        <div>{ card.seed }</div>
      </span>
    </>
  );
}
