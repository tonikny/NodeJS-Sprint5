const router = require('express').Router();
const { check } = require('express-validator');
const validate = require('../middlewares/validator.js');
const controllers = require('../controllers');

// Regles de validacio de formularis
const userValidationRules = [
  check('nom')
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage('Nom must be atleast 3 characters long'),
  check('email', 'Email is required').not().isEmpty(),
  check('password', 'Password should be between 5 to 8 characters long')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 8 }),
];

// Rutes

// Sign-up
router.post(
  '/register',
  validate(userValidationRules),
  controllers.auth.register,
);

// Login
router.post('/login', controllers.auth.login);

// Logout
//router.post('/logout', controllers.auth.logout);

module.exports = router;
