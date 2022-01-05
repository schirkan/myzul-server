import { Server, Origins } from 'boardgame.io/server';
import config from './common/config';
import { AzulGame } from './../client/src/games/azul/Game';
// import { registerUserScoreStore } from './lib/saveUserScore';
const serve = require('koa-static');

(async () => {
  const server = Server({
    games: [AzulGame],
    origins: [Origins.LOCALHOST_IN_DEVELOPMENT, 'http://' + config.hostname]
  });

  // await registerUserScoreStore(server);

  const publicDir = __dirname + '/../public';
  server.app.use(serve(publicDir));
  server.run(8000, () => console.log('Server started ' + new Date()));
})();
