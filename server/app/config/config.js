require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' o 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3000
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 27017,
    name: process.env.DEV_DB_NAME || 'db'
  }
};
const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT) || 3000
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: parseInt(process.env.PROD_DB_PORT) || 27017,
    name: process.env.PROD_DB_NAME || 'test'
  }
};

const config = {
  dev,
  prod
};
const entorn = config[env];

const jwt = {
  token: process.env.TOKEN_SECRET
};

module.exports = { entorn, jwt };