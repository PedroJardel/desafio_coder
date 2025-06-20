import http from 'http';
import dotenv from 'dotenv';
import app from './src/app.js';
import { setupSocket } from './socket/product.websocket.js';
import productModel from './src/models/entities/product.model.js';

dotenv.config();
const PORT = process.env.APP_PORT || 8080;

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server HTTP e WebSocket running in http://localhost:${PORT}`);
});