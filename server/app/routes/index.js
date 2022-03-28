const express = require('express');
const cors = require('cors');

const salesRoutes = require('./sales');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

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
/*   app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache')
    next() 
  }); */
  // Enrutadors
  app.use('/sales', salesRoutes);
  app.use('/users', usersRoutes);
  app.use('/', authRoutes);

  // catch 404 and forward to error handler
  app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'API endpoint doesn\'t exist'
    })
  });

};
