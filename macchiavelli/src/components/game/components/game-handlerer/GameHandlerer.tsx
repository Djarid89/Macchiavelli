import React, { useEffect, useState } from 'react';
import { IPlayer } from '../dashboard/components/combinations/interfaces/Combinations';
import styles from './GameHandlerer.module.scss';
import io from 'socket.io-client';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayersCB(players: IPlayer[]): void;
}

const socket = io('http://localhost:8000');

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayersCB }: Props) => {
  const [player, setPlayer] = useState<IPlayer>();
  const [players, setPlayers] = useState<IPlayer[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('disconnect', () => {
      console.log('disConnected');
    });

    socket.on('setClientId', (clientId: number) => {
      setPlayers([...players.concat([{ id: clientId, name: player?.name || '' }])]);
      setPlayer({ id: 0, name: '' });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('setClientId');
    };
  }, []);

  function addPlayer(): void {
    if(!player?.name) {
      return;
    }
    socket.emit('setClientId');
  }

  function startGame(): void {
    setGameStarting(true);
  }

  return(
    <>
      <div className={ styles.gameHandlerer }>
        <div>Players:</div>
        { players.map((iPlayer: IPlayer, index: number) => <div key={index}>{iPlayer.name}</div>) }
        <div><input type="text" onChange={ (event: any) => setPlayer({ id: player?.id || 0, name: event.target.value }) } value={ player?.name || '' }/></div>
        <div><button onClick={ addPlayer }>Add</button></div>
        <div><button onClick={ startGame }>Gioca</button></div>
      </div>
    </>
  )
}

