import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Player } from '../game-handlerer/class/game-handler';
import { MoveHistory } from './class/dashboard';
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
  setPlayers(players: Player[]): void;
  setPlayer(player: Player): void;
  reStart(): void;
}

export const DashBoard: React.FC<Props> = ({ socket, players, player, setPlayers, setPlayer, reStart }: Props) => {
  const moveHistory = useRef(new MoveHistory([], player.cards));
  const [combination, setCombination] = useState<Combination>(new Combination([]));
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);
  let isOnAttach = false;
  const [hasThowCards, setHasThowCards] = useState(false);
  const cardsUpdated = useRef(player.cards);
  const draggedCombination = useRef<Combination>();

  useEffect(() => {
    socket.on('getNextPlayer', (_players: Player[]) => {
      setPlayers(_players);
      const _player = _players.find((pl: Player) => pl.id === player.id);
      if(_player) {
        setPlayer(_player);
      }
    });
    socket.on('getCombinations', (_combinations: Combination[]) => {
      setCombinations(_combinations.map((comb: Combination) => Combination.generateFromProps(comb)));
    });
    socket.on('getResetMoveHistory', (_players: Player[], _combinations: Combination[]) => {
      const _player = _players.find((pl: Player) => pl.id === player.id);
      if(_player) {
        moveHistory.current = new MoveHistory(_combinations, _player.cards);
      }
    });

    return () => {
      socket.off('getNextPlayer');
      socket.off('getCombinations');
      socket.off('getResetMoveHistory');
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
    if(e.altKey || !player.isMyTurn) {
      return;
    }

    if(isOnAttach) {
      isOnAttach = false;
      return;
    }

    const comb = draggedCombination.current || combination;
    if(e) {
      comb.positionTop = e.clientY - e.target.offsetTop - 125;
      comb.positionLeft = e.clientX - e.target.offsetLeft;
    }
    if(draggedCombination.current) {
      draggedCombination.current.isDragged = false;
      const draggedCombIndex = combinations.findIndex((_comb: Combination) => _comb.id === draggedCombination.current?.id);
      if(draggedCombIndex !== -1) {
        combinations.splice(draggedCombIndex, 1);
      }
    } else {
      setHasThowCards(true);
    }
    comb.cards = Combination.orderCards(comb.cards);
    comb.id = Combination.generateId(combinations);
    comb.cards.forEach((card: CCard) => card.selected = false);
    let newCombinations = combinations.concat([comb.copyCombination()]);
    newCombinations.forEach((_comb: Combination) => _comb.cards = _comb.cards.filter((card: CCard) => !card.selected));
    newCombinations = newCombinations.filter((_comb: Combination) => _comb.cards.length);
    socket.emit('setCombinations', newCombinations);
    player.cards = (player.cards.filter((card: CCard) => !card.selected));
    cardsUpdated.current = player.cards.map((card: CCard) => card);
    comb.cards.forEach((card: CCard) => card.selected = false);
    setCombination(new Combination([]));
    draggedCombination.current = undefined;
    moveHistory.current.addMove(newCombinations, cardsUpdated.current);
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
    const newCombinations = combinations.filter((comb: Combination) => comb.cards.length)
    socket.emit('setCombinations', newCombinations)
    cardsUpdated.current = (player.cards.filter((card: CCard) => !card.selected));
    player.cards = cardsUpdated.current.map((card: CCard) => card);
    setCombination(new Combination([]));
    setHasThowCards(true);
    moveHistory.current.addMove(newCombinations, cardsUpdated.current);
  }

  const handleOrderCard = (): void => {
    cardsUpdated.current.sort((prev: CCard, next: CCard) => prev.number > next.number ? 1 : -1);
    player.cards = cardsUpdated.current.map((card: CCard) => card);
    socket.emit('upgradeCards', player);
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
    if(!cardsUpdated.current.length) {
      reStart();
      return;
    }
    setHasThowCards(false);
    player.cards = cardsUpdated.current.map((card: CCard) => card);
    socket.emit('resetMoveHistory', combinations);
    socket.emit('setNextPlayer', player, combinations);
  }

  const handleGetCardFromDeck = (card: CCard): void => {
    setHasThowCards(false);
    cardsUpdated.current.push(new CCard(card.id, card.number, card.seed, card.selected));
    player.cards = cardsUpdated.current.map((card: CCard) => card);
    socket.emit('resetMoveHistory', combinations);
    socket.emit('setNextPlayer', player, combinations);
  }

  const handleSetCards = (from: number, to: number): void => {
    const card = cardsUpdated.current[from];
    if(!card) {
      return;
    }

    const cardToMove = new CCard(card.id, card.number, card.seed, card.selected);
    cardsUpdated.current.splice(from, 1);
    cardsUpdated.current.splice(to, 0, cardToMove);
    player.cards = cardsUpdated.current.map((card: CCard) => card);
    forceUpdate();
  }

  const getIsMyTurnStyle = (_player: Player): any => {
    return {
      fontWeight: _player.isMyTurn ? 'bold' : '',
      backgroundColor: _player.isMyTurn ? 'green' : '#efefef',
      color: _player.isMyTurn ? 'white' : 'black'
    };
  }

  const handleUndo = (event: any) => {
    if (event.ctrlKey && event.key === "z") {
      const prevMove = moveHistory.current.undoMove();
      if(prevMove) {
        prevMove.combinations.forEach((combination: Combination) => {
          combination.cards = combination.cards.map((card: CCard) => {
            card.selected = false;
            return card;
          })
        }) 
        setCombinations(prevMove.combinations);
        socket.emit('setCombinations', prevMove.combinations);
        if(prevMove.cards) {
          cardsUpdated.current = prevMove.cards.map((card: CCard) => {
            card.selected = false;
            return card;
          });
          player.cards = cardsUpdated.current.map((card: CCard) => card);
        }
      }
    }
  };

  return (
    <>
      <div onKeyDown={ handleUndo } tabIndex= { 0 } className={ styles.dashboard }>
        <div className={ styles.dashboardHeader }>
          { players.map((_player: Player, index: number) => <span style={ getIsMyTurnStyle(_player) } key={index}>{_player.name} ({_player.cards.length})</span>) }
        </div>
        <div className={ styles.dashboardContainer } onDrop={ (e: any) => handleThrowDown(e) } onDragOver={ handleDroppable } onDragEnter={ handleDroppable }>
          <Combinations combinations={ combinations }
                        combine={ handleCombine }
                        readOnly={ !player.isMyTurn }
                        attachCombination={ (combinationToAttach: Combination) => handleAttachCombination(combinationToAttach) }
                        unsetCombination={ () => setCombination(new Combination([])) }
                        onDraggedCombination={ (comb: Combination) => draggedCombination.current = comb.copyCombination() }></Combinations>
          <span className={ styles.deckContainer }>
            <Deck socket={ socket } playerId={ player.id } getCardFromDeck={ handleGetCardFromDeck } readOnly={ !player.isMyTurn || hasThowCards }></Deck>
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
