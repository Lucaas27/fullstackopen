import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URI:
    process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : process.env.DEV_MONGODB_URI,
  PORT: process.env.PORT,
};
