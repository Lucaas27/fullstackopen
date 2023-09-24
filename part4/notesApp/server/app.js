import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import notesRouter from './controllers/notes.js';
import config from './utils/envs.js';
import customMiddleware from './utils/middleware.js';
import { info, error } from './utils/logger.js';

const app = express();

// Mongo connection
mongoose
  .connect(config.mongodb_uri)
  .then(() => {
    info('Connected to MongoDB');
  })
  .catch((e) => {
    error('Error connecting to MongoDB:', e.message);
  });

// Middleware
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(customMiddleware.reqLogger());
app.use('/api/notes', notesRouter);
app.use(customMiddleware.UnknownEndpoint);
app.use(customMiddleware.errorHandler);

export default app;
