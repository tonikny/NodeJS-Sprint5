const express = require('express');
const router = express.Router();

const controllers = require('../controllers');
//import { createChannel, getChannel, getChannels, getUserName } from "../controllers/ChannelController";
//import { validateJWT } from "../middlewares/auth";

//app.post("/"); // crear sala
//app.get("/:nom"); // obtenir sala

// obtenir sales
router.get("/", controllers.sales.getSales); 
//router.get("/users/:id", validateJWT, getUserName);

module.exports = router;