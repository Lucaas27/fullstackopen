import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './utils/config.js';
import {
  customErrorHandler, reqLogger, unknownEndpoint,
} from './utils/middleware.js';
import contactsRouter from './controllers/contacts.js';
import { info, error } from './utils/logger.js';

const app = express();

mongoose.connect(config.mongodb_uri)
  .then(() => {
    info('Connected to MongoDB Atlas');
  }).catch((e) => error('Failed to connect to MongoDb Atlas.', e));

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(reqLogger());
app.use('/api/contacts', contactsRouter);
app.use(unknownEndpoint);
app.use(customErrorHandler);

export default app;
