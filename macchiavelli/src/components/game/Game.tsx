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

  const asd = (asd: string): void => {
    setPlayerName(asd);
  }

  return (
    <div className={styles.game}>
      {
        !players.length
        ?
          <GameHandlerer socket={ socket } _setPlayers={ setPlayers } _setPlayersName={ asd }></GameHandlerer>
        :
          <DashBoard  socket={ socket } players={ players } playerName={ playerName } setPlayers={ setPlayers }></DashBoard>
      }
    </div>
  );
}
