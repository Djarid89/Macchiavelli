import React, { useEffect, useState } from 'react';
import { CCard } from './components/card/class/Card';
import { IPlayer } from './components/cards/interfaces/Card';
import { Deck } from './components/deck/Deck';
import { Hand } from './components/Hand/Hand';
import styles from './Dashboard.module.scss';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  const [cards, setCards] = useState<CCard[]>([]);

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((player: IPlayer, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer }>
          <span className={ styles.deckContainer }>
            <Deck setCards={ setCards } addCard={ (cardToAdd: CCard) => { setCards(cards.concat([cardToAdd])) } }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <Hand cards={ cards } setCards={ setCards }></Hand>
        </div>
      </div>
    </>
  );
}
