import dotenv from 'dotenv';

dotenv.config();

export default {
  mongodb_uri:
    process.env.NODE_ENV === 'prod'
      ? process.env.MONGODB_URI
      : process.env.NODE_ENV === 'dev' && process.env.DEV_MONGODB_URI,
  port: process.env.PORT,
};
