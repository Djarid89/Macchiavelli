import React, { Component } from 'react';
import { IPlayer } from '../player/Player';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  return (
    <>

      {
        players.map((player: IPlayer) => <div>{player.name}</div>)
      }
    </>
  );
}
