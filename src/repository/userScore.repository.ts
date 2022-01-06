import { Collection, Db } from 'mongodb';

export class UserScore {
    matchId: string;
    username: string;
    won: boolean;
    points: number;
    duration: number;
}

export class UserScoreRepository {
    constructor(private db: any) { }

    private table: Collection<UserScore> = this.db.collection('UserScore');

    getAll(): Promise<UserScore[]> {
        return this.table.find().toArray();
    }

    async insertOne(data: UserScore) {
        const filter = {
            username: data.username,
            matchId: data.matchId
        };
        const options = { upsert: true };
        this.table.updateOne(filter, { $set: data }, options);
    }

    insertMany(data: UserScore[]) {
        return this.table.insertMany(data);
    }
}
