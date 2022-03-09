const express = require('express');
const cors = require('cors');

const sales = require('./sales');
const users = require('./users');
const auth = require('./auth');

// guaranteed to get dependencies
/* const allRoutes = () => {
  const router = Router();
  //auth(app);
  //user(app);
  sales(router);

  //return router;
} */

// export a function that accepts `app` as a param
module.exports = (app) => {

  app.use(cors());
  app.use(express.json());

  // Enrutadors
  app.use('/sales', sales);
  app.use('/users', users);
  app.use('/', auth);

  // catch 404 and forward to error handler
  app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesnt exist'
    })
  });

};
