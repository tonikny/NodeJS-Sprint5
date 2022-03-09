
const initServer = () => {

  const { config } = require('../config/config');
  const cors = require('cors');
  const express = require('express');
  const { createServer } = require("http");
  const { Server } = require("socket.io");
  const authorize = require('../middlewares/auth');

  const app = express();
  const httpServer = createServer(app);


  const io = new Server(httpServer, {
    cors: {
      origins: ["*"]
    }
  });
  const { app: { port } } = config;

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', `${socket.id.substr(0, 2)} \u27A5 ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });


  // Arrencar el servidor http
  httpServer.listen(port, () => console.log(`listening on port ${port}`));

  // Carrega de rutes
  require("../routes")(app);

}

module.exports = initServer;