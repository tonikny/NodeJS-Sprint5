require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' o 'prod'

const dev = {
  app: {
    port: parseInt(process.env.DEV_APP_PORT) || 3001
  },
  db: {
    host: process.env.DEV_DB_HOST || 'localhost',
    port: parseInt(process.env.DEV_DB_PORT) || 3306,
    user: process.env.DEV_DB_USER,
    pass: process.env.DEV_DB_PASS,
    name: process.env.DEV_DB_NAME,
    recreate: process.env.RECREATE_DB === 'true',
    debug: (process.env.DEBUG_DB !== 'true')?false:console.log
  }
};
const prod = {
  app: {
    port: parseInt(process.env.PROD_APP_PORT) || 3000
  },
  db: {
    host: process.env.PROD_DB_HOST || 'localhost',
    port: parseInt(process.env.PROD_DB_PORT) || 3306,
    user: process.env.DEV_DB_USER,
    pass: process.env.DEV_DB_PASS,
    name: process.env.PROD_DB_NAME,
    recreate: false,
    debug: false
  }
};

const entorn = {
  dev,
  prod
};
const config = entorn[env];

const jwtSecretToken = {
  token: process.env.TOKEN_SECRET
};

module.exports = { config, jwtSecretToken };