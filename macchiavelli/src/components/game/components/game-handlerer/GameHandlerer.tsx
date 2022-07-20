import React, { useEffect, useRef, useState } from 'react';
import styles from './GameHandlerer.module.scss';
import { Socket } from 'socket.io-client';
import { Player } from './class/game-handler';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  _setPlayers(players: Player[], id: number): void;
}

export const GameHandlerer: React.FC<Props> = ({ socket, _setPlayers }: Props) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const player = useRef<Player>();

  useEffect(() => {
    socket.on('setPlayer', (_player: Player) => player.current = _player);
    setInterval(() => socket.emit('getPlayers'), 500);
    socket.on('setPlayers', (_players: Player[]) => setPlayers(_players));
    socket.on('startGame', (_players: Player[]) => _setPlayers(_players, player?.current?.id || 0));

    return () => {
      socket.off('setPlayer');
      socket.off('setPlayers');
      socket.off('startGame');
    };
  }, []);

  function subscribe(): void {
    if(!playerName) {
      return;
    }
    socket.emit('setPlayer', playerName);
    setSubscribed(true);
  }

  function startGame(): void {
    socket.emit('setStartGame');
  }

  return(
    <>
      <div className={ styles.gameHandlerer }>
          { !subscribed ?
          <>
            <div><input type="text" onChange={(event: any) => setPlayerName(event.target.value)} value={playerName || ''} /></div>
            <div><button onClick={ subscribe }>Iscriviti alla partita</button></div>
          </>
          :
          <>
            <div>Giocatori iscritti:</div>
            { players.map((_player: Player, index: number) => <div key={index}>{_player.name}</div>) }
          </>
        }
        { player?.current?.isMyTurn ? <div><button onClick={ startGame }>Gioca</button></div> : '' }
      </div>
    </>
  )
}

