import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { DashBoard } from './components/dashboard/Dashboard';
import { Player } from './components/game-handlerer/class/game-handler';
import { GameHandlerer } from './components/game-handlerer/GameHandlerer';
import styles from './Game.module.scss';

let socket = io('http://localhost:8000');
socket.emit('initGame')
export const Game: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player>();

  socket.on('setInitGame', () => {
    setPlayers([]);
    setPlayer(undefined);
  });

  socket.on('reconnect', () => {
    if(socket) {
      socket.disconnect();
    }
    socket = io('http://localhost:8000');
  });

  const handleSetPlayers = (_players: Player[], id: number): void => {
    setPlayers(_players);
    setPlayer(_players.find((pl: Player) => pl.id === id));
  }

  return (
    <div className={styles.game}>
      {
        !players.length || !player
        ?
          <GameHandlerer socket={ socket } _setPlayers={ handleSetPlayers }></GameHandlerer>
        :
          <DashBoard socket={ socket } players={ players } reStart={ () => socket.emit('initGame') } setPlayers={ setPlayers } player={ player } setPlayer={ setPlayer }></DashBoard>
      }
    </div>
  );
}
