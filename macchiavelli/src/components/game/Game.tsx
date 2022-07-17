import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { DashBoard } from './components/dashboard/Dashboard';
import { Player } from './components/game-handlerer/class/game-handler';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarting, setGameStarting] = useState<boolean>(false);
  const socket = io('http://localhost:8000');

  return (
    <div className={styles.game}>
      {
        !gameStarting ?
        <GameHandlerer socket={socket} setGameStarting = { setGameStarting }  setPlayersCB = { setPlayers }></GameHandlerer> :
        <DashBoard players = { players }></DashBoard>
      }
    </div>
  );
}
