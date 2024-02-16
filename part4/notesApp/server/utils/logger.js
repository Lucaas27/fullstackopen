const info = (...params) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.log(...params);
  }
  return null;
};

const error = (...params) => {
  if (process.env.NODE_ENV !== 'production') {
    return console.error(...params);
  }
  return null;
};

export { info, error };
