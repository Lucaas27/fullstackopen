const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    return console.log(...params);
  }
  return null;
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    return console.error(...params);
  }
  return null;
};

export { info, error };
