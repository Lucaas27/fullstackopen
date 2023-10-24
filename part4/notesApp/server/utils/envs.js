import dotenv from 'dotenv';

dotenv.config();

export default {
  mongodb_uri:
    process.env.NODE_ENV !== 'production'
      ? process.env.DEV_MONGODB_URI
      : process.env.MONGODB_URI,
  port: process.env.PORT,
};
