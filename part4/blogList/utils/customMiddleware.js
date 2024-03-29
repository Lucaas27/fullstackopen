import morgan from 'morgan';

const reqLogger = () => {
  morgan.token('requestBody', req => JSON.stringify(req.body));
  return morgan('----- :method :url :status :response-time ms :requestBody -----');
};

// const reqLogger = (request, response, next) => {
//   info('Method:', request.method);
//   info('Path:  ', request.path);
//   info('Body:  ', request.body);
//   info('---');
//   next();
// };

export default reqLogger;
