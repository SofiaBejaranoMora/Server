import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { setupSocket } from './socket';

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

app.use(cors({
  origin: FRONTEND_URL,
}));

const io = new SocketIOServer(server, {
  cors: {
    origin: FRONTEND_URL,
  },
});

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});