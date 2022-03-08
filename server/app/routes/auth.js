const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const controllers = require('../controllers');

// Sign-up
router.post(
  '/register',
  // TODO: passar a validator.js
  [
    check('nom')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Nom must be atleast 3 characters long'),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password should be between 5 to 8 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 8 }),
  ],
  controllers.auth.register,
)

// Login
router.post('/login', controllers.auth.login)


module.exports = router
