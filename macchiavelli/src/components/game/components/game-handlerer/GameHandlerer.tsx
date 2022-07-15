import React, { useEffect, useState } from 'react';
import { IPlayer } from '../dashboard/components/combinations/interfaces/Combinations';
import styles from './GameHandlerer.module.scss';
import io from 'socket.io-client';
import { Client } from './interfaces/game-handler';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayersCB(players: IPlayer[]): void;
}

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayersCB }: Props) => {
  const [player, setPlayer] = useState<IPlayer>();
  const [players, setPlayers] = useState<string[]>([]);
  const socket = io('http://localhost:8000');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disConnected');
    });

    socket.on('setPlayer', (client: Client) => {
      setPlayer(client)
    });

    setInterval(() => {
      socket.emit('getPlayersName')
    },5000);
    socket.on('setPlayersName', (playersName: string[]) => {
      setPlayers(playersName)
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('setPlayer');
    };
  }, []);

  function addPlayer(): void {
    if(!player?.name) {
      return;
    }
    socket.emit('setPlayerId', new Client(0, player.name));
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

