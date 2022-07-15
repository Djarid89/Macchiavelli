import React, { useState } from 'react';
import { IPlayer } from './components/dashboard/components/combinations/interfaces/Combinations';
import { DashBoard } from './components/dashboard/Dashboard';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [gameStarting, setGameStarting] = useState<boolean>(false);

  return (
    <div className={styles.game}>
      {
        !gameStarting ?
        <GameHandlerer setGameStarting = { setGameStarting }  setPlayersCB = { setPlayers }></GameHandlerer> :
        <DashBoard players = { players }></DashBoard>
      }
    </div>
  );
}
