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
    const newPlayer = new Player(socket.id, playerName, [], players.length === 0);
    const count = players.reduce((sum: number, player: Player) => player.name === newPlayer.name ? sum + 1 : sum, 0);
    if(count) {
      newPlayer.name = `${newPlayer.name}_${count}`;
    }
    players.push(newPlayer);
    socket.emit('setPlayer', newPlayer.toIPlayer());
  });

  socket.on('getPlayers', () => {
    socket.emit('setPlayers', players.map((player: Player) => player.toIPlayer()));
  });

  socket.on('setStartGame', () => {
    players.forEach((player: Player) => player.cards = deck.getCards());
    io.emit('startGame', players.map((player: Player) => player.toIPlayer()));
  });

  socket.on('giveCard', () => {
    const playerWithTurnOn = players.find((player: Player) => player.isMyTurn);
    if(playerWithTurnOn) {
      playerWithTurnOn.cards.push(deck.getCard());
    }
    socket.emit('getCards', playerWithTurnOn.cards);
  });

  socket.on('setCombinations', (combinationsForUpdate: Combination[]) => {
    combinations = combinationsForUpdate;
    io.emit('getCombinations', combinations);
  });

  socket.on('setNextPlayer', () => {
    const playerWithTurnOnIndex = players.findIndex((player: Player) => player.isMyTurn);
    if(playerWithTurnOnIndex !== -1) {
      players[playerWithTurnOnIndex].isMyTurn = false;
      if(playerWithTurnOnIndex === players.length - 1) {
        players[0].isMyTurn = true
      } else {
        players[playerWithTurnOnIndex + 1].isMyTurn = true
      }
      io.emit('getNextPlayer', players.map((player: Player) => player.toIPlayer()));
    }
  });

  socket.on("disconnect", () => {
    const index = players.findIndex((player: Player) => player.id === socket.id)
    if(index !== -1) {
      players.splice(index, 1);
    }
  });
});

//start our server
server.listen(8000, () => {
  console.log(`Express is listening at http://localhost:8000`);
});
