import { Server, Origins } from 'boardgame.io/server';
import { AzulGame } from './../client/src/games/azul/Game';
const serve = require('koa-static');

const server = Server({
  games: [AzulGame],
  origins: [Origins.LOCALHOST],
});

const publicDir = __dirname + '/../public';
server.app.use(serve(publicDir));
server.run(8000, () => console.log('Server started'));