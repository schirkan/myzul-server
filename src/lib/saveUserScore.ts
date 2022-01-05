import { Ctx } from "boardgame.io";
import Router from '@koa/router';
import { createMongoDbConnection } from "../common/mongodb";
import { UserScoreRepository } from "../repository/userScore.repository";
import { AzulGame } from './../../client/src/games/azul/Game';
import { AzulGameState, AzulGameover } from "../../client/src/games/azul/models";

export const registerUserScoreStore = async (server: { router: Router }) => {

  const db = await createMongoDbConnection();
  const repository = new UserScoreRepository(db);

  const oldOnEnd = AzulGame.onEnd;
  AzulGame.onEnd = (G: AzulGameState, ctx: Ctx) => {
    // get winner
    const result = ctx.gameover as AzulGameover;
    const playerIds = Object.keys(G.score);
    // ctx.match
    // ctx.matchData![+playerId].name || 'Spieler ' + (+playerId + 1);


    // store result in db
    // repository.insert();

    return oldOnEnd && oldOnEnd(G, ctx);
  };

  server.router.get('/custom-endpoint', (ctx, next) => {
    ctx.body = 'Hello World!';
  });
}
