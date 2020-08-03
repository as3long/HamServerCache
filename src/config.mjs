import path from 'path';
import hamserver from 'hamserver';

export default {
    ip: '0.0.0.0',
    port: 38207,
    mongodb: 'mongodb://localhost/hamservercache',
    model: 'cache',
    controllerPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), './controller'),
    protoPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), '../protos'),
};