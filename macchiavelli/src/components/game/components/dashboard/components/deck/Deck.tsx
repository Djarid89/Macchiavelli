import React, { useEffect, useState } from 'react';
import { CCard } from '../card/class/Card';
import { CDeck } from './class/Deck';
import styles from './Deck.module.scss';
import deckSvg from '../../../../../../assets/deck.svg'

function importDeck(r: any) {
  const result: any = {};
   r.keys().forEach((item: any, index: number) => result[item.replace('./', '')] = r(item));
  return result
 }
 const images = importDeck(require.context('../../../../../../assets', false, /\.(png|jpe?g|svg)$/));

interface Props {
  setCards(cards: CCard[]): void;
  addCard(cards: CCard): void;
}
export const Deck: React.FC<Props> = ({ setCards, addCard }: Props) => {
  const [deck] = useState(new CDeck());

  useEffect(() => {
    setCards(deck.getCards());
  }, []);

  return (
    <>
      <div className={ styles.deck } onClick={ () => addCard(deck.getCard()) }>
        <img src={ images['deck.svg'] } alt='mySvgImage' />
      </div>
    </>
  );
}