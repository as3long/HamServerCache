import hamserver from 'hamserver';
import config from './config.mjs';

const server = new hamserver.Server(config);

server.start();

console.log('程序已经启动，环境变量', process.env);
