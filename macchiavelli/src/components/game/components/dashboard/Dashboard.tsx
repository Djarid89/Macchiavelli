import React, { Component } from 'react';
import { IPlayer } from '../player/Player';
import styles from './Dashboard.module.scss';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          { players.map((player: IPlayer) => <span>{player.name}</span>) }
        </div>
        <div className={styles.dashboardContainer}>
          
        </div>
        <div className={styles.dashboardFooter}>
          
        </div>
      </div>
    </>
  );
}
