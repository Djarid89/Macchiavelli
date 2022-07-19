import React, { useCallback, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Player } from '../game-handlerer/class/game-handler';
import { CCard } from './components/card/class/Card';
import { Combination } from './components/combinations/class/Combinations';
import { Combinations } from './components/combinations/Combinations';
import { Deck } from './components/deck/Deck';
import { Hand } from './components/Hand/Hand';
import styles from './Dashboard.module.scss';

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  players: Player[];
  player: Player;
  setPlayers(players: Player[]): void
  setPlayer(player: Player): void;
}

export const DashBoard: React.FC<Props> = ({ socket, players, player, setPlayers, setPlayer }: Props) => {
  const [combination, setCombination] = useState<Combination>(new Combination([]));
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);
  let isOnAttach = false;
  const [hasThowCards, setHasThowCards] = useState(false);

  useEffect(() => {
    socket.on('getNextPlayer', (_players: Player[]) => {
      setPlayers(_players);
      const _player = _players.find((pl: Player) => pl.name === player.name);
      if(_player) {
        setPlayer(_player);
      }
    });
    socket.on('getCombinations', (_combinations: Combination[]) => setCombinations(_combinations.map((comb: Combination) => Combination.generateFromProps(comb))));

    return () => {
      socket.off('getNextPlayer');
      socket.off('getCombinations');
    };
  }, []);

  const handleCombine = (card: CCard): void => {
    let combCards: CCard[] = combination.cards;
    if(card.selected) {
      card.selected = false;
      const toRemove = combination.cards.find((c: CCard) => c.id === card.id);
      if(toRemove) {
        toRemove.selected = false;
        combCards = combination.cards.filter((c: CCard) => c.id !== toRemove.id);
      }
      setCombination(new Combination(combCards));
    } else {
      card.selected = true;
      combCards = combination.cards.concat([new CCard(card.id, card.number, card.seed, card.selected)]);
      setCombination(new Combination(combCards));
    }
  }

  const handleThrowDown = (e?: any): void => {
    if(e.altKey) {
      return;
    }

    if(isOnAttach) {
      isOnAttach = false;
      return;
    }

    if(e) {
      combination.positionTop = e.clientY - e.target.offsetTop - 125;
      combination.positionLeft = e.clientX - e.target.offsetLeft;
    }
    combination.cards = Combination.orderCards(combination.cards);
    combination.id = combinations.length + 1;
    combination.cards.forEach((card: CCard) => card.selected = false);
    const newCombinations = combinations.concat([combination.copyCombination()]);
    newCombinations.forEach((comb: Combination) => comb.cards = comb.cards.filter((card: CCard) => !card.selected));
    socket.emit('setCombinations', newCombinations.filter((comb: Combination) => comb.cards.length));
    player.cards = (player.cards.filter((card: CCard) => !card.selected));
    socket.emit('upgradeCards', player.cards);
    combination.cards.forEach((card: CCard) => card.selected = false);
    setCombination(new Combination([]));
    setHasThowCards(true);
  }

  const handleAttachCombination = (combinationToModify: Combination): void => {
    isOnAttach = true;
    if(!combination.isAllCombinable(combination.cards.concat(combinationToModify.cards || []))) {
      return;
    }
    combinationToModify.cards = Combination.orderCards(combinationToModify.cards.concat(combination.cards));
    combinationToModify.cards.forEach((card: CCard) => card.selected = false);
    combinations.forEach((comb: Combination) => {
      if(comb.id !== combinationToModify.id) {
        comb.cards = comb.cards.filter((card: CCard) => !card.selected);
      }
    });
    socket.emit('setCombinations', combinations.filter((comb: Combination) => comb.cards.length))
    player.cards = (player.cards.filter((card: CCard) => !card.selected));
    socket.emit('upgradeCards', player.cards);
    setCombination(new Combination([]));
    setHasThowCards(true);
  }

  const handleOrderCard = (): void => {
    player.cards.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
    forceUpdate();
  }

  const handleDroppable = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const handlePasso = () => {
    for(const comb of combinations) {
      if(!comb.isAllCombinable(comb.cards)) {
        return;
      }
    }
    setHasThowCards(false);
    socket.emit('setNextPlayer');
  }

  const handleGetCardFromDeck = (card: CCard): void => {
    setHasThowCards(false);
    player.cards.push({ ...card });
  }

  const handleSetCards = (from: number, to: number): void => {
    const card = player.cards[from];
    if(!card) {
      return;
    }

    const cardToMove = new CCard(card.id, card.number, card.seed, card.selected);
    player.cards.splice(from, 1);
    player.cards.splice(to, 0, cardToMove);
    forceUpdate();
  }

  return (
    <>
      <div className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((_player: Player, index: number) => <span style={{ fontWeight: _player.isMyTurn ? 'bold' : '' }} key={index}>{_player.name}</span>) }
        </div>
        <div className={ styles.dashboardContainer } onDrop={ (e: any) => handleThrowDown(e) } onDragOver={ handleDroppable } onDragEnter={ handleDroppable }>
          <Combinations combinations={ combinations }
                        combine={ handleCombine }
                        readOnly={ !player.isMyTurn }
                        attachCombination={ (combinationToAttach: Combination) => handleAttachCombination(combinationToAttach) }
                        unsetCombination={ () => setCombination(new Combination([])) }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck socket={ socket } addCard={ handleGetCardFromDeck } readOnly={ !player.isMyTurn || hasThowCards }></Deck>
          </span>
        </div>
        <div className={ styles.dashboardFooter }>
          <div className={ styles.dashboardButtonOrder }>
            <button onClick={ handleOrderCard }>Ordina</button>
          </div>
          <div className={ styles.dashboardHand }>
            <Hand cards={ player.cards } readOnly={ !player.isMyTurn } moveCards={ handleSetCards } combine={ handleCombine }></Hand>
          </div>
          <div className={ styles.dashboardButtonPass }>
            { hasThowCards && player.isMyTurn ? <button onClick={ handlePasso }>Passo</button> : '' }
          </div>
        </div>
      </div>
    </>
  );
}
