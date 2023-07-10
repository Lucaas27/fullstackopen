import dotenv from 'dotenv';

dotenv.config();

export default {
  mongodb_uri: process.env.MONGODB_URI,
  port: 3000,
};
