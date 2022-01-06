import { Collection, Db } from 'mongodb';

export class UserScore {
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

    insertOne(data: UserScore): Promise<UserScore> {
        return this.table.insertOne(data).then(() => data);
    }

    insertMany(data: UserScore[]): Promise<UserScore[]> {
        return this.table.insertMany(data).then(() => data);
    }
}
