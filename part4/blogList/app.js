import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import reqLogger from './utils/customMiddleware.js';
import config from './utils/config.js';
import blogRouter from './controllers/blog.js';
import { info, error } from './utils/logger.js';

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => info('Connected to MongoDb Atlas'))
  .catch(e => error('Error connecting to MongoDB Atlas', e.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(reqLogger());
app.use('/api/blogs', blogRouter);

export default app;
