import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { DashBoard } from './components/dashboard/Dashboard';
import { Player } from './components/game-handlerer/class/game-handler';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const socket = io('http://localhost:8000');

  return (
    <div className={styles.game}>
      {
        !players.length
        ?
          <GameHandlerer socket={ socket } _setPlayers={ setPlayers } _setPlayersName={ setPlayerName }></GameHandlerer>
        :
          <DashBoard  socket={ socket } players={ players } playerName={ playerName } setPlayers={ setPlayers }></DashBoard>
      }
    </div>
  );
}
