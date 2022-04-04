const router = require('express').Router();
const controllers = require('../controllers');
const authorize = require('../middlewares/auth');

router.use(authorize);

// crear missatge
//router.post("/", controllers.missatges.crearMissatge); // crear sala

// obtenir missatges de una sala
//router.get("/:salaId", controllers.missatges.obtenirMissatgesSala);


module.exports = router;
