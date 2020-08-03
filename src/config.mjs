import path from 'path';
import hamserver from 'hamserver';

export default {
    ip: '0.0.0.0',
    port: process.env.WALLE_PORT || 38207, //瓦力部署系统上可以添加全局变量
    mongodb: 'mongodb://localhost/hamservercache',
    model: 'cache',
    controllerPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), './controller'),
    protoPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), '../protos'),
};