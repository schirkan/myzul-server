import { Server, Origins } from 'boardgame.io/server';
import config from './common/config';
import { AzulGame } from './../client/src/games/azul/Game';
import { registerHighscoreApi } from './lib/saveUserScore';
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const server = Server({
  games: [AzulGame],
  origins: [Origins.LOCALHOST_IN_DEVELOPMENT, 'http://' + config.hostname]
});
const publicDir = __dirname + '/../public';
server.app.use(serve(publicDir));
server.app.use(bodyParser());
registerHighscoreApi(server);
server.run(8000, () => console.log('Server started ' + new Date()));
