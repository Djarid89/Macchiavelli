import React, { useEffect, useState } from 'react';
import styles from './GameHandlerer.module.scss';
import io from 'socket.io-client';
import { Player } from './class/game-handler';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayersCB(players: Player[]): void;
}

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayersCB }: Props) => {
  const [player, setPlayer] = useState<Player>();
  const [players, setPlayers] = useState<string[]>([]);
  const socket = io('http://localhost:8000');

  useEffect(() => {
    socket.on('connect', () =>  console.log('connected'));

    socket.on('disconnect', () => console.log('disconnected'));

    setInterval(() => socket.emit('getPlayersName'),5000);
    socket.on('setPlayersName', (playersName: string[]) => setPlayers(playersName));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('setPlayersName');
    };
  }, []);

  function addPlayer(): void {
    if(!player?.name) {
      return;
    }

    socket.once('setPlayerId', (id: number) => setPlayer({ id, name: player?.name || '' }));
    socket.emit('setPlayer', player.name);
  }

  function startGame(): void {
    setGameStarting(true);
  }

  return(
    <>
      <div className={ styles.gameHandlerer }>
        {
          player?.id
          ?
          <div>
            <div>Players:</div>
            {players.map((playerName: string, index: number) => <div key={index}>{playerName}</div>)}
          </div>
          :
          <div>
            <div><input type="text" onChange={(event: any) => setPlayer({ id: player?.id || 0, name: event.target.value })} value={player?.name || ''} /></div>
            <div><button onClick={addPlayer}>Add</button></div>
            <div><button onClick={startGame}>Gioca</button></div>
          </div>
        }
      </div>
    </>
  )
}

