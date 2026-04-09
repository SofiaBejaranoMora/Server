import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { setupSocket } from './socket';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://client-vi2d.vercel.app',
  'https://client-vi2d-5o5mo1l5p-sofiabejaranom24-3145s-projects.vercel.app',
];

const server = http.createServer(app);

app.use(cors({
  origin: allowedOrigins,
}));

const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  },
});

const PORT = Number(process.env.PORT) || 3000;

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});