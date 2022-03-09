const router = require('express').Router();
const controllers = require('../controllers');
const authorize = require('../middlewares/auth');

router.use(authorize);

// Get Users
router.get('/', controllers.users.getUsers);

// Get Single User
router.get('/:id', controllers.users.getUser)

// Update User
router.put('/:id', controllers.users.updateUser)

// Delete User
router.delete('/:id', controllers.users.deleteUser)


module.exports = router
