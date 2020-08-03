#HamServerExample

Ham服务例子, 教你用node快速实现一个rpc服务。

HamServer模块的实质是对grpc框架包裹了一层，方便使用。

仅兼容node 14以上版本

## 运行代码
```
// 第一步安装
npm i

// 第二步运行服务
npm run dev

// 第三步运行客户端代码
npm run client
```

## Ham服务的对应规则
- pb文件的package对应实现controller的文件夹
- pb文件的service对应package下的文件名
- pb文件的rpc方法对应service文件下的方法

## Server的使用
Server实例化的时候需要传入config。

```javascript
import path from 'path';
import hamserver from 'hamserver';

export default {
    ip: '0.0.0.0',
    port: 18206,
    controllerPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), './controller'),
    protoPath: path.resolve(hamserver.Utils.getDirName(import.meta.url), '../protos'),
};
```