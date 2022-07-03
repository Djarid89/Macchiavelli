import React, { Component, useState } from 'react';
import { IPlayer } from '../player/Player';
import styles from './GameHandlerer.module.scss';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayers(players: IPlayer[]): void;
}

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayers }: Props) => {
  const [player, setPlayer] = useState<IPlayer>({ name: '' });
  const [playerAdded, setPlayerAdded] = useState<IPlayer[]>([]);

  function addPlayer(player: IPlayer): void {
    setPlayerAdded([...playerAdded.concat(player)]);
    setPlayer({ name: '' });
  }

  return(
    <>
      <div className={ styles.gameHandlerer }>
        <div>Players:</div>
        { playerAdded.map((p: IPlayer, index: number) => <div key={index}>{p.name}</div>) }
        <div><input type="text" onChange={ (event: React.ChangeEvent<HTMLInputElement>) => setPlayer({ name: event.target.value }) } value={ player.name }/></div>
        <div><button onClick={ () => addPlayer(player) }>Add</button></div>
        <div>
          <button onClick={
            () => {
              setPlayers(playerAdded);
              setGameStarting(true);
            }
          }>Gioca</button>
        </div>
      </div>
    </>
  )
}
