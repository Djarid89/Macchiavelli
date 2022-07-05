import React, { useEffect } from 'react';
import { CCard } from '../card/class/Card';
import { CDeck } from './class/Deck';
import styles from './Deck.module.scss';

interface Props {
  setCards(cards: CCard[]): void;
  addCard(cards: CCard): void;
}

export const Deck: React.FC<Props> = ({ setCards, addCard }: Props) => {
  const deck = new CDeck();

  useEffect(() => {
    setCards(deck.getCards());
  }, []);

  return (
    <>
      <div className={ styles.deck } onClick={ () => addCard(deck.getCard()) }>Deck</div>
    </>
  );
}
