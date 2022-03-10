const router = require('express').Router();
const controllers = require('../controllers');
const authorize = require('../middlewares/auth');

router.use(authorize);

// crear sala
router.post("/", controllers.sales.crearSala); // crear sala

//TODO: entrar a sala
router.get("/:nom"); // entrar a sala

// obtenir sales
router.get("/", controllers.sales.getSales);


module.exports = router;
