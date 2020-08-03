import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
// import to from 'await-to-js';
import hamserver from 'hamserver';
import config from '../src/config.mjs';

const PROTO_PATH = path.resolve(hamserver.Utils.getDirName(import.meta.url), '../protos/cache.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const cacheService = grpc.loadPackageDefinition(packageDefinition).cacheService;
const client = new cacheService.CacheService(`127.0.0.1:${config.port}`, grpc.credentials.createInsecure());

async function test() {
  // client.Add({
  //   key: 'q_test1',
  //   value: '修改test1',
  //   expiration: (new Date()).toISOString()
  // }, (err, res) => {
  //   console.log(err, res);
  // });

  // client.Get({
  //   key: 'test211111'
  // }, (err, res) => {
  //   console.log(err, res);
  // });

  client.GetByPrefix({
    key: 'q_'
  }, (err, res) => {
    console.log(err, res);
  })

  // client.GetAllItems({}, (err, res) => {
  //   console.log(err, res);
  // });

  // client.DeleteKey({
  //   key: 'test1'
  // }, (err, res) => {
  //   console.log(err, res);
  // });

  // client.DeleteAll({}, (err, res) => {
  //   console.log(err, res);
  // });
}

test();