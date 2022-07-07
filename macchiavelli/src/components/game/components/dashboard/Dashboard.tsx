import React, { useState } from 'react';
import { CCard } from './components/card/class/Card';
import { Combination } from './components/combinations/class/Combinations';
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
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [cardToAttach, setCardToAttach] = useState<CCard | undefined>();

  const handleSetCombinations = (combination: Combination): void => {
    combination.id = combinations.length + 1;
    setCombinations(combinations.concat([combination]));
  }

  const handleSetCardToAttach = (card: CCard): void => {
    setCardToAttach(new CCard(card.id, card.number, card.seed));
  }

  const handleRemoveCardFromHand = (cardToRemove: CCard): void => {
    setCards(cards.filter((card: CCard) => card.id !== cardToRemove.id));
  }

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((player: IPlayer, index: number) => <span key={index}>{player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer }>
          <Combinations combinations={ combinations }
                        cardToAttach={ cardToAttach }
                        removeCardFromHand={ handleRemoveCardFromHand }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck setCards={ setCards } addCard={ (cardToAdd: CCard) => { setCards(cards.concat([cardToAdd])) } }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <div className={ styles.dashboardHand }>
            <Hand cards={ cards } combinationId={ 0 }
                  setCards={ setCards }
                  setCombinations={ handleSetCombinations }
                  setCardToAttach={ handleSetCardToAttach }></Hand>
          </div>
          <div className={ styles.dashboardButton }>
            <button>Passo</button>
          </div>
        </div>
      </div>
    </>
  );
}
