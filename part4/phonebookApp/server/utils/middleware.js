import morgan from 'morgan';

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

export const reqLogger = () => {
  morgan.token('jsonReq', (req) => JSON.stringify(req.body));
  return morgan(':method :url :status :res[content-length] - :response-time ms :jsonReq');
};

export const customErrorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.name === 'CastError') {
    return res.status(400)
      .send({ error: 'Contact ID does not match the required format' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400)
      .json({ error: error.name, reason: error.message });
  }
  return next(error);
};
