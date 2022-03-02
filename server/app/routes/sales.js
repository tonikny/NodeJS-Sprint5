const express = require('express');
const router = express.Router();
//import { createChannel, getChannel, getChannels, getUserName } from "../controllers/ChannelController";
//import { validateJWT } from "../middlewares/auth";

//app.post("/"); // crear sala
//app.get("/:nom"); // obtenir sala
router.get("/", (req, res) => {
  console.log('sales');
  res.json([{nom: 'nom1', nombreUsuaris: 5}, {nom: 'nom2', nombreUsuaris: 88}]);
}); // obtenir sales

//router.get("/users/:id", validateJWT, getUserName);

module.exports = router;