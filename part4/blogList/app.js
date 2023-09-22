const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const reqLogger = require('./utils/customMiddleware.js');
const config = require('./utils/config.js');
const blogRouter = require('./controllers/blog.js');
const { info, error } = require('./utils/logger.js');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => info('Connected to MongoDb Atlas'))
  .catch(e => error('Error connecting to MongoDB Atlas', e.message));

// Middleware
app.use(cors());
app.use(express.json());
app.use(reqLogger());
app.use('/api/blogs', blogRouter);

module.exports = app;
