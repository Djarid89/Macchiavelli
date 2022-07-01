import React, { Component, useState } from 'react';
import { IPlayer } from '../player/Player';

interface Props {
  setGameStarting(value: boolean): void;
  setPlayers(players: IPlayer[]): void;
}

export const GameHandlerer: React.FC<Props> = ({ setGameStarting, setPlayers }: Props) => {
  const [player, setPlayer] = useState('');
  const [playerAdded, setPlayerAdded] = useState(['']);

  function addPlayer(playerName: string): void {
    setPlayerAdded([...playerAdded.concat(playerName)]);
    setPlayer('');
  }

  return(
    <>
      <p>Hello GameHandlerer.</p>
      <div>Players:</div>
      { playerAdded.map((p: string, index: number) => <div key={index}>{p}</div>) }
      <div><input type="text" onChange={ (event: React.ChangeEvent<HTMLInputElement>) => setPlayer(event.target.value) } value={player}/></div>
      <div><button onClick={ () => addPlayer(player) }>Add</button></div>
      <div>
        <button onClick={
          () => {
            setPlayers([]);
            setGameStarting(true);
          }
        }>Gioca</button>
      </div>
    </>
  )
}
