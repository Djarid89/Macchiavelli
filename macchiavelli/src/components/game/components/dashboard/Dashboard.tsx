import React, { useState } from 'react';
import { CCard } from './components/card/class/Card';
import { CCombinations } from './components/combinations/class/Combinations';
import { Combinations } from './components/combinations/Combinations';
import { IPlayer } from './components/combinations/interfaces/Combinations';
import { Deck } from './components/deck/Deck';
import { Hand } from './components/Hand/Hand';
import styles from './Dashboard.module.scss';

interface Props {
  players: IPlayer[];
}

export const DashBoard: React.FC<Props> = ({ players }: Props) => {
  const [cards, setCards] = useState<CCard[]>([]);
  const [combinations, setCombinations] = useState<CCombinations[]>([]);

  const handleSetCombinations = (combination: CCombinations): void => {
    setCombinations(combinations.concat([combination]));
  }

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((player: IPlayer, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer }>
          <Combinations combinations={ combinations }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck setCards={ setCards } addCard={ (cardToAdd: CCard) => { setCards(cards.concat([cardToAdd])) } }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <div className={ styles.dashboardHand }>
            <Hand cards={ cards } combinationId={ 0 } setCards={ setCards } setCombinations={ handleSetCombinations }></Hand>
          </div>
          <div className={ styles.dashboardButton }>
            <button>Passo</button>
          </div>
        </div>
      </div>
    </>
  );
}
