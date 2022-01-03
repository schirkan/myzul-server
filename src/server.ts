import { Server, Origins } from 'boardgame.io/server';
import { env } from 'process';
import { AzulGame } from './../client/src/games/azul/Game';
const serve = require('koa-static');

const server = Server({
  games: [AzulGame],
  origins: [Origins.LOCALHOST, 'http://' + env.WEBSITE_HOSTNAME],
});

const publicDir = __dirname + '/../public';
server.app.use(serve(publicDir));
server.run(8000, () => console.log('Server started'));