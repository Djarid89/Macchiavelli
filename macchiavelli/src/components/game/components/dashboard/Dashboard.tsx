import React, { Component } from 'react';
import { IPlayer } from './components/cards/interfaces/Card';
import { Deck } from './components/deck/Deck';
import styles from './Dashboard.module.scss';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          { players.map((player: IPlayer, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={styles.dashboardContainer}>
          asd
          <span className={styles.deckContainer}>
            <Deck></Deck>
          </span>
        </div>
        <div className={styles.dashboardFooter}>
          asd
        </div>
      </div>
    </>
  );
}
