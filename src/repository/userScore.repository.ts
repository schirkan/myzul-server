import { Collection } from 'mongodb';
import { Db } from 'mongodb';

export class UserScore {
    username: string;
    played: number;
    win: number;
    highscore: number;
}

export class UserScoreRepository {
    constructor(private db: Db) { }

    private table: Collection<UserScore> = this.db.collection('UserScore');

    getAll(): Promise<UserScore[]> {
        return this.table.find().toArray();
    }

    insert(data: UserScore): Promise<UserScore> {
        return this.table.insertOne(data).then(() => data);
    }
}
