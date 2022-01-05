import { Db, MongoClient } from 'mongodb';
import config from './config';

// Fake MongoDB
const mongoMock = require('mongo-mock');
mongoMock.max_delay = 100;

export const createMongoDbConnection = async (): Promise<Db> => {
  try {
    let db: MongoClient;

    if (config.mongodb.useMock) {
      db = await mongoMock.MongoClient.connect(config.mongodb.uri);
    } else {
      db = await MongoClient.connect(config.mongodb.uri);
    }

    return db.db(config.mongodb.database);
  } catch (error) {
    console.log('Exception while creating MongoDbConnection: ' + error);
    return null;
  }
};
