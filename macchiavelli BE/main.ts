import express from 'express';
import * as http from 'http';
import { Server, Socket } from "socket.io";
import cors = require('cors');
import morgan = require('morgan');
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './interfaces/main';
import { Client } from './class/main';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));
const clients: Client[] = [];

const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], allowedHeaders: ["my-custom-header"], credentials: true }
});

io.on('connection', (socket: Socket) => {
  socket.on('setClientId', () => {
    let validId = false;
    let random = Math.floor(Math.random() * 100000) + 1;
    while(!validId) {
      random = Math.floor(Math.random() * 100000) + 1;
      if(clients.every((client: Client) => client.id !== random)) {
        validId = true;
      }
    }
    const newClient = new Client(random);
    clients.push(newClient);
    socket.emit('setClientId', newClient.id);
  });
});

//start our server
server.listen(8000, () => {
  console.log(`Express is listening at http://localhost:8000`);
});
