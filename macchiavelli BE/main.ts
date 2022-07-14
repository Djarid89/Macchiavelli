import express from 'express';
import * as http from 'http';
import WebSocket from 'ws';
import cors = require('cors');
import morgan = require('morgan');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients: Client[] = [];

class Client extends WebSocket {
  id: string;

  constructor(url: string) {
    super(url);
    this.id = this.generateUniqueID();
  }

  private readonly generateUniqueID = (): string => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return `${s4()}-${s4()}-${s4()}`;
  };
}

wss.on('connection', (ws: WebSocket) => {
  clients.push(new Client(ws.url));

  ws.on('message', (message: string) => {
    const info = message.split(';');
    const text = info[0];
    const id = info[1];
    if(id) {
      const client = clients.find((c: Client) => c.id === id);
      client?.send(`Hello, you sent -> ${text}`);
    } else {
      clients.forEach((client: Client) => client.send(`Hello, you sent -> ${message}`));
    }
  });

  ws.send('Hi there, I am a WebSocket server');
});


//start our server
server.listen(8000, () => {
  console.log(`Express is listening at http://localhost:8000`);
});