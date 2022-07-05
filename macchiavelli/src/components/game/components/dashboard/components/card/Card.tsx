import React from 'react';
import { Seed } from '../cards/interfaces/Card';
import styles from './Card.module.scss';

interface Props {
  number: number;
  seed: Seed;
}

export const Card: React.FC<Props> = ({ number, seed }: Props) => {
  return (
    <>
      <span className={styles.card}>
        <div>{ number }</div>
        <div>{ seed }</div>
      </span>
    </>
  );
}
