import hamserver from 'hamserver';

export default class Greeter extends hamserver.BaseController {
  sayHello(ctx) {
    console.log(ctx.req);
    const {name} = ctx.req;
    return {
      message: `你好${name}`
    };
  }
}