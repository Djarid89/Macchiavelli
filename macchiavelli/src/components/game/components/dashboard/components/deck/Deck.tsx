import React from 'react';
import { CDeck } from './class/Deck';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const deck = new CDeck();

  return (
    <>
      <div className={ styles.deck } onClick={ () => { const a = deck.getCard(); alert(`Number: ${a?.number} Seed: ${a?.seed} Length:${deck.cards.length}`); } }>Deck</div>
    </>
  );
}