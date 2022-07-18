import React, { useEffect, useState } from 'react';
import styles from './GameHandlerer.module.scss';
import { Socket } from 'socket.io-client';
import { Player } from './class/game-handler';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface Props {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  _setPlayers(players: Player[]): void;
  _setPlayersName(playerName: string): void;
}

export const GameHandlerer: React.FC<Props> = ({ socket, _setPlayers, _setPlayersName }: Props) => {
  const [player, setPlayer] = useState<Player>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [subscribed, setSubscribed] = useState<boolean>(false);

  useEffect(() => {
    socket.on('setPlayer', (_player: Player) => {
      _setPlayersName(_player?.name || '');
      setPlayer(_player);
    });
    setInterval(() => socket.emit('getPlayers'), 500);
    socket.on('setPlayers', (_players: Player[]) => {
      setPlayers(_players);
    });
    socket.on('startGame', (_players: Player[]) => {
      _setPlayers(_players);
    });

    return () => {
      socket.off('setPlayer');
      socket.off('setPlayers');
      socket.off('startGame');
    };
  }, []);

  function subscribe(): void {
    if(!player?.name) {
      return;
    }
    socket.emit('setPlayer', player.name);
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
            <div><input type="text" onChange={(event: any) => setPlayer(new Player(event.target.value))} value={player?.name || ''} /></div>
            <div><button onClick={ subscribe }>Iscriviti alla partita</button></div>
          </>
          :
          <>
            <div>Giocatori iscritti:</div>
            { players.map((_player: Player, index: number) => <div key={index}>{_player.name}</div>) }
          </>
        }
        { player?.isMyTurn ? <div><button onClick={ startGame }>Gioca</button></div> : '' }
      </div>
    </>
  )
}

