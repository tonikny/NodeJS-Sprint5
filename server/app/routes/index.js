//const { Router } = require('express');

//const app = require('express');
//const router = Router();
//import auth from './routes/auth';
//import user from './routes/user';
const sales = require('./sales');

// guaranteed to get dependencies
/* const allRoutes = () => {
  const router = Router();
  //auth(app);
  //user(app);
  sales(router);

  //return router;
} */

module.exports = routes = { sales };