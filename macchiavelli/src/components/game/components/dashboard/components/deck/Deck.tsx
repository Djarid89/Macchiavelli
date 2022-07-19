import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { CCard } from '../card/class/Card';
import styles from './Deck.module.scss';

function importDeck(r: any) {
  const result: any = {};
   r.keys().forEach((item: any, index: number) => result[item.replace('./', '')] = r(item));
  return result
 }
 const images = importDeck(require.context('../../../../../../assets', false, /\.(png|jpe?g|svg)$/));

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  readOnly: boolean;
  addCard(cards: CCard): void;
}
export const Deck: React.FC<Props> = ({ socket, readOnly, addCard }: Props) => {
  useEffect(() => {
    socket.on('getCard', (card: CCard) => {
      addCard(card);
      socket.emit('setNextPlayer');
    });

    return () => {
      socket.off('getCard');
    };
  }, []);

  const handleOnClick = (): void => {
    if(readOnly) {
      return;
    }
    socket.emit('giveCard');
  }

  return (
    <>
      <div className={ styles.deck } onClick={ handleOnClick }>
        <img src={ images['deck.svg'] } alt='mySvgImage' />
      </div>
    </>
  );
}
