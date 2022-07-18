import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Player } from '../../../game-handlerer/class/game-handler';
import styles from './Deck.module.scss';

function importDeck(r: any) {
  const result: any = {};
   r.keys().forEach((item: any, index: number) => result[item.replace('./', '')] = r(item));
  return result
 }
 const images = importDeck(require.context('../../../../../../assets', false, /\.(png|jpe?g|svg)$/));

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setPlayers(players: Player[]): void;
}
export const Deck: React.FC<Props> = ({ socket, setPlayers }: Props) => {
  useEffect(() => {
    socket.on('getCard', (_players: Player[]) => {
      setPlayers(_players);
    });

    return () => {
      socket.off('getCard');
    };
  }, []);

  const handleAddCard = () => {
    socket.emit('giveCard');
  }

  return (
    <>
      <div className={ styles.deck } onClick={ handleAddCard }>
        <img src={ images['deck.svg'] } alt='mySvgImage' />
      </div>
    </>
  );
}
