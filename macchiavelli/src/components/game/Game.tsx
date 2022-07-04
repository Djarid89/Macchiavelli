import React, { Component, useState } from 'react';
import { IPlayer } from './components/dashboard/components/cards/interfaces/Card';
import { DashBoard } from './components/dashboard/Dashboard';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<IPlayer[]>([{ name: 'Marco' }]);
  const [gameStarting, setGameStarting] = useState<boolean>(true);

  return (
    <>
      <div className={styles.game}>
        {
          !gameStarting ?
          <GameHandlerer setGameStarting = { setGameStarting }  setPlayers = { setPlayers }></GameHandlerer> :
          <DashBoard players = { players }></DashBoard>
        }
      </div>
    </>
  );
}
