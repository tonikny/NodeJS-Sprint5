const express = require('express');
const cors = require('cors');

const salesRoutes = require('./sales');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

// export a function that accepts `app` as a param
module.exports = (app) => {

  app.use(cors());
  app.use(express.json());

  // Enrutadors
  //app.use('/sales', salesRoutes);
  app.use('/users', usersRoutes);
  app.use('/', authRoutes);

  // catch 404 and forward to error handler
  app.use('*', (req, res) => {
    return res.status(404).json({
      success: false,
      message: 'No existeix aquest endpoint a l\'API'
    })
  });

};
