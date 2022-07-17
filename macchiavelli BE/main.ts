import express from 'express';
import * as http from 'http';
import { Server, Socket } from "socket.io";
import cors = require('cors');
import morgan = require('morgan');
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './interfaces/main';
import { Player } from './class/main';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));
const players: Player[] = [];

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ["my-custom-header"], credentials: true }
});

io.on('connection', (socket: Socket) => {
  socket.on('setPlayer', (playerName: string) => {
    const random = Math.floor(Math.random() * 100000) + 1;
    players.push(new Player(socket.id, playerName));
    socket.emit('setPlayerId', random);
  });

  socket.on('getPlayersName', () => {
    socket.emit('setPlayersName', players.map((client: Player) => client.name));
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
