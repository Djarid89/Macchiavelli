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
  setCards(cards: CCard[]): void;
}
export const Deck: React.FC<Props> = ({ socket, setCards }: Props) => {
  useEffect(() => {
    socket.on('getCards', (cards: CCard[]) => {
      setCards(cards);
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
