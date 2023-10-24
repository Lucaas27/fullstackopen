import morgan from 'morgan';
import { error } from './logger.js';

// Custom Middleware

const reqLogger = () => {
  morgan.token('requestBody', (req) => JSON.stringify(req.body));
  return morgan(
    '----- :method :url :status :response-time ms :requestBody -----',
  );
};

// Middleware for handling unsupported routes
const UnknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
};

// Custom error middleware
const errorHandler = (e, req, res, next) => {
  error(e.message);
  if (e.name === 'CastError') {
    return res
      .status(400)
      .send({ error: 'Note ID does not match the required format' });
  }
  if (e.name === 'ValidationError') {
    return res.status(400).json({
      Error: e.name,
      Reason: e.message,
    });
  }
  return next(e);
};

export default { reqLogger, UnknownEndpoint, errorHandler };
