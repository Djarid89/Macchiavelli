import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { DashBoard } from './components/dashboard/Dashboard';
import { Player } from './components/game-handlerer/class/game-handler';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

const socket = io('http://localhost:8000');
export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();

  const handleSetPlayers = (_players: Player[], name: string): void => {
    setPlayers(_players);
    setPlayer(Player.get(_players, name));
  }

  return (
    <div className={styles.game}>
      {
        !players.length || !player
        ?
          <GameHandlerer socket={ socket } _setPlayers={ handleSetPlayers }></GameHandlerer>
        :
          <DashBoard  socket={ socket } players={ players } setPlayers={ setPlayers } player={ player } setPlayer={ setPlayer }></DashBoard>
      }
    </div>
  );
}
