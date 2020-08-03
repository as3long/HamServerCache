import hamserver from 'hamserver';
import config from './config.mjs';

console.log(hamserver);
const server = new hamserver.Server(config);

server.start();
