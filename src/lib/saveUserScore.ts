import { Ctx } from "boardgame.io";
import Router from '@koa/router';
import { createConnection } from "../common/mongodb";
import { UserScore, UserScoreRepository } from "../repository/userScore.repository";
import { AzulGame } from './../../client/src/games/azul/Game';
import { AzulGameState, AzulGameover } from "../../client/src/games/azul/models";

let _repository: UserScoreRepository;

const getRepository = async () => {
  if (!_repository) {
    const db = await createConnection();
    _repository = new UserScoreRepository(db);
  }
  return _repository;
}

// export const registerUserScoreStore = () => {
//   // const oldOnEnd = AzulGame.onEnd;
//   const oldOnEnd = AzulGame.phases.placeTiles.onEnd;
//   // AzulGame.onEnd = (G: AzulGameState, ctx: Ctx) => {
//   AzulGame.phases.placeTiles.onEnd = (G: AzulGameState, ctx: Ctx) => {
//     const newItems: UserScore[] = Object.keys(G.score).map(playerId => {
//       const name = (ctx as any).matchData![+playerId].name || 'Spieler ' + (+playerId + 1);

//       return {
//         username: name,
//         won: (ctx.gameover as AzulGameover).winnerPlayerId === playerId,
//         points: G.score[playerId].points,
//         duration: G.score[playerId].time
//       };
//     });

//     // store result in db
//     getRepository().then(repo => repo.insertMany(newItems));

//     // call original event
//     return oldOnEnd && oldOnEnd(G, ctx);
//   };
// }

export const registerHighscoreApi = (server: { router: Router }) => {
  server.router.get('/api/highscore', async (ctx, next) => {
    const repository = await getRepository();
    const scores = await repository.getAll();
    ctx.body = mapToHighscore(scores);
    next();
  });

  server.router.post('/api/highscore', async (ctx, next) => {
    await getRepository().then(repo => repo.insertOne((ctx.request as any).body));
  });
}

interface HighscoreItem {
  username: string;
  won: number;
  points: number;
  duration: number;
}

const mapToHighscore = (scores: UserScore[]): HighscoreItem[] => {
  let result: { [username: string]: HighscoreItem } = {};
  scores.forEach(x => {
    if (!result[x.username]) {
      result[x.username] = {
        username: x.username,
        duration: 0,
        points: 0,
        won: 0
      }
    }
    result[x.username].duration += x.duration;
    result[x.username].points += x.points;
    result[x.username].won += x.won ? 1 : 0;
  });
  return Object.values(result);
}