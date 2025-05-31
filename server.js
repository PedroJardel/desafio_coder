import http from 'http';
import dotenv from 'dotenv';
import app from './src/app.js';
import { setupSocket } from './socket/product.websocket.js';

dotenv.config();
const PORT = process.env.APP_PORT || 8080;

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Servidor HTTP e WebSocket rodando em http://localhost:${PORT}`);
});