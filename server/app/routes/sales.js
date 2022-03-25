const router = require('express').Router();
const controllers = require('../controllers');
const authorize = require('../middlewares/auth');

router.use(authorize);

// crear sala
router.post("/", controllers.sales.crearSala);

// entrar a sala
//router.put("/entra", controllers.sales.entrarASala);

// sortir de sala
//router.put("/surt/", controllers.sales.sortirDeSala);

// obtenir sales
//router.get("/", controllers.sales.getSales);


module.exports = router;
