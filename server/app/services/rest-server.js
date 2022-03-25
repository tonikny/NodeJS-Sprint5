
const initServer = () => {

  const { config } = require('../config/config');
  const express = require('express');
  const { createServer } = require("http");
  const initSocket = require('./socket');

  const app = express();
  const httpServer = createServer(app);

  const { app: { port } } = config;

  // definicio de socket
  initSocket(httpServer);

  // Arrencar el servidor http
  //httpServer.listen(port, '192.168.1.100', () => console.log(`listening on port ${port}`));
  httpServer.listen(port, () => console.log(`listening on port ${port}`));

  // Carrega de rutes
  require("../routes")(app);

}

module.exports = initServer;