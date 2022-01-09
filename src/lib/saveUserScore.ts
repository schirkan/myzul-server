import Router from '@koa/router';
import { createConnection } from '../common/mongodb';
import { UserScore, UserScoreRepository } from '../repository/userScore.repository';
import { json } from 'co-body';

let _repository: UserScoreRepository;

const getRepository = async () => {
  if (!_repository) {
    const db = await createConnection();
    _repository = new UserScoreRepository(db);
  }
  return _repository;
}

export const registerHighscoreApi = (server: { router: Router }) => {
  server.router.get('/api/highscore', async (ctx, next) => {
    const repository = await getRepository();
    const scores = await repository.getAll();
    ctx.body = mapToHighscore(scores);
    next();
  });

  server.router.post('/api/highscore', async (ctx, next) => {
    const body = await json(ctx) as UserScore;
    const repository = await getRepository();
    repository.insertOne(body);
    ctx.body = 'OK';
    ctx.response.status = 200;
  });
}

interface HighscoreItem {
  username: string;
  games: number;
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
        games: 0,
        duration: 0,
        points: 0,
        won: 0
      }
    }
    result[x.username].games++;
    result[x.username].duration += x.duration;
    result[x.username].points += x.points;
    result[x.username].won += x.won ? 1 : 0;
  });
  return Object.values(result).sort((a, b) => b.points - a.points);
}