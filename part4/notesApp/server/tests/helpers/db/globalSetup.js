/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { info } from '../../../utils/logger';

export async function setup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  globalThis.__MONGOINSTANCE = instance;
  process.env.TEST_MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  process.env.TEST_MONGO_URI += '/testNotesDB';

  // The following is to make sure the database is clean before a test starts
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  info(`Started mongodb-memory-server instance: ${process.env.TEST_MONGO_URI}`);
}

export async function teardown() {
  const instance = globalThis.__MONGOINSTANCE;
  await instance.stop();
  info(`Stopped mongodb-memory-server instance: ${process.env.TEST_MONGO_URI}`);
}
