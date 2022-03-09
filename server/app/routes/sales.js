const router = require('express').Router();
const controllers = require('../controllers');
const authorize = require('../middlewares/auth');

//router.use(authorize);

//app.post("/"); // crear sala
//app.get("/:nom"); // obtenir sala

// obtenir sales
router.get("/", controllers.sales.getSales);
//router.get("/users/:id", validateJWT, getUserName);



module.exports = router;