import React from 'react';
import { Card } from '../card/Card';
import { CCard } from '../card/class/Card';
import { CCombinations } from './class/Combinations';
import styles from './Combinations.module.scss';

interface Props {
  combinations: CCombinations[];
}

export const Combinations: React.FC<Props> = ({ combinations }: Props) => {
  return (
    <>
      {
        <span className={ styles.combinations }>
          {
            combinations.map((combination: CCombinations, index: number) =>
              <span className={ styles.cardContainer } key={ index }>
                { combination.cards.map((card: CCard, index2: number) => <Card key={ index2 } card={ card } index={ index }></Card>) }
              </span>
            )
          }
        </span>
      }
    </>
  );
}
