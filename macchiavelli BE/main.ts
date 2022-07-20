import express from 'express';
import * as http from 'http';
import { Server, Socket } from "socket.io";
import cors = require('cors');
import morgan = require('morgan');
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './interfaces/main';
import { Combination, Deck, Player } from './class/main';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));
const players: Player[] = [];
const deck = new Deck();
let combinations: Combination[] = [];

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ["my-custom-header"], credentials: true }
});

io.on('connection', (socket: Socket) => {
  socket.on('setPlayer', (playerName: string) => {
    let validId = false;
    let random = Math.floor(Math.random() * 100000) + 1;
    while(!validId) {
      random = Math.floor(Math.random() * 100000) + 1;
      if(players.every((player: Player) => player.id !== random)) {
        validId = true;
      }
    }
    const newPlayer = new Player(random, playerName, [], players.length === 0);
    const count = players.reduce((sum: number, player: Player) => player.name === newPlayer.name ? sum + 1 : sum, 0);
    if(count) {
      newPlayer.name = `${newPlayer.name}_${count}`;
    }
    players.push(newPlayer);
    socket.emit('setPlayer', newPlayer);
  });

  socket.on('getPlayers', () => {
    socket.emit('setPlayers', players);
  });

  socket.on('setStartGame', () => {
    players.forEach((player: Player) => player.cards = deck.getCards());
    io.emit('startGame', players);
  });

  socket.on('giveCard', (idPlayer: number) => {
    const player = players.find((_player: Player) => _player.id === idPlayer);
    if(player) {
      const newCard = deck.getCard();
      player.cards.push(newCard);
      socket.emit('getCard', newCard);
    }
  });

  socket.on('setCombinations', (combinationsForUpdate: Combination[]) => {
    combinations = combinationsForUpdate;
    io.emit('getCombinations', combinations);
  });

  socket.on('upgradeCards', (_player: Player) => {
    const player = players.find((pl: Player) => pl.id === _player.id);
    if(player) {
      player.cards = _player.cards;
    }
  });

  socket.on('setNextPlayer', (_player: Player) => {
    const index = players.findIndex((pl: Player) => pl.id === _player.id);
    if(index !== -1) {
      const player = players[index];
      player.cards = _player.cards;
      player.isMyTurn = false;
      if(index === players.length - 1) {
        players[0].isMyTurn = true
      } else {
        players[index + 1].isMyTurn = true
      }
      io.emit('getNextPlayer', players);
    }
  });

  socket.on("disconnect", () => {
    console.log(socket);
  });
});

//start our server
server.listen(8000, () => {
  console.log(`Express is listening at http://localhost:8000`);
});
