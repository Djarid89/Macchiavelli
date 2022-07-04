import React, { useState } from 'react';
import { IPlayer } from '../dashboard/components/cards/interfaces/Card';
import styles from './GameHandlerer.module.scss';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayers(players: IPlayer[]): void;
}

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayers }: Props) => {
  const [player, setPlayer] = useState<IPlayer>({ name: '' });
  const [playerAdded, setPlayerAdded] = useState<IPlayer[]>([]);

  function addPlayer(): void {
    if(!player?.name) {
      return;
    }
    setPlayerAdded([...playerAdded.concat({ name: player?.name })]);
    setPlayer({ name: '' });
  }

  function handleSetPlayer(event: React.ChangeEvent<HTMLInputElement>): void {
    setPlayer({ name: event.target.value })
  }

  function startGame(): void {
    setPlayers(playerAdded);
    setGameStarting(true);
  }

  return(
    <>
      <div className={ styles.gameHandlerer }>
        <div>Players:</div>
        { playerAdded.map((iPlayer: IPlayer, index: number) => <div key={index}>{iPlayer.name}</div>) }
        <div><input type="text" onChange={ handleSetPlayer } value={ player?.name }/></div>
        <div><button onClick={ addPlayer }>Add</button></div>
        <div><button onClick={ startGame }>Gioca</button></div>
      </div>
    </>
  )
}
