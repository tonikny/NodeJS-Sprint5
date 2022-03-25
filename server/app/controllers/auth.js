const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwtSecretToken } = require('../config/config');
const userService = require('../services/users');
const { User } = require('../models')
const currentUser = require('../services/currentuser');

module.exports = {

  register: (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      //TODO: fer servir userService
      const user = User.build({
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((response) => {
          res.status(201).json({
            message: 'User successfully created!',
            result: response,
          })
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          })
        });
    });
  },

  login: async (req, res, next) => {
    let getUser;
    //TODO: fer servir authService + userService?
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      raw: true
    })
    if (!user) {
      return res.status(401).json({
        message: 'No existeix l\'usuari',
      })
    }
    getUser = user
    if (req.body.password && await bcrypt.compare(req.body.password, user.password)) {
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser.id,
          nom: getUser.nom
        },
        jwtSecretToken.token,
        {
          expiresIn: '1d',
        },
      );
      currentUser.setData({
        email: getUser.email,
        userId: getUser.id,
        nom: getUser.nom
      });
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        id: getUser.id,
      })
    } else {
      return res.status(401).json({
        message: 'Authentication failed',
      })
    }
  },

  //TODO: logout
  logout: async (req, res, next) => {}

  }
