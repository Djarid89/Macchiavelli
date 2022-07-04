import React, { Component, useEffect, useState } from 'react';
import { CDeck } from './class/Deck';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const [deck, setDeck] = useState<CDeck>(new CDeck());

  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className={ styles.deck }>Deck</div>
    </>
  );
}