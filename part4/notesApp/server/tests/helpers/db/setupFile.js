/* eslint-disable import/no-extraneous-dependencies */
import { beforeAll, afterAll, beforeEach } from 'vitest';
import * as mongoose from 'mongoose';
import { clearCollection, addNotesToCollection } from '../helpers.js';
import { info } from '../../../utils/logger.js';

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI);
  info(`Connected to: ${process.env.TEST_MONGO_URI}`);
});

beforeEach(async () => {
  await clearCollection();
  await addNotesToCollection();
  info('Test setup done');
});

afterAll(async () => {
  await mongoose.disconnect();
  info(`Disconnected from: ${process.env.TEST_MONGO_URI}`);
});
