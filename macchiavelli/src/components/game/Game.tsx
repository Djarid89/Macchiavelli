import React, { Component, useState } from 'react';
import { DashBoard } from './components/dashboard/Dashboard';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import { IPlayer } from './components/player/Player';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [gameStarting, setGameStarting] = useState<boolean>(false);

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
