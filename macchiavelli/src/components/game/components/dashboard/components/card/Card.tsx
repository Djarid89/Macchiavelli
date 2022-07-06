import React from 'react';
import { Seed } from '../cards/interfaces/Card';
import styles from './Card.module.scss';

interface Props {
  number: number;
  seed: Seed;
  index: number;
  setSwipeFrom(toIndex: number): void;
  doSwipe(fromIndex: number): void;
}

export const Card: React.FC<Props> = ({ number, seed, index, setSwipeFrom, doSwipe }: Props) => {
  const stopEventStopPropagation = (e: any): void => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <>
      <span className={ styles.card } 
            draggable
            onDragStart={ () => setSwipeFrom(index) }
            onDragOver={ stopEventStopPropagation }
            onDrop={ () => doSwipe(index) }>
        <div>{ number }</div>
        <div>{ seed }</div>
      </span>
    </>
  );
}
