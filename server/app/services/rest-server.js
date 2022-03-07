
const initServer = () => {

  const { config } = require('../config/config');
  const cors = require('cors');
  const express = require('express');
  const app = express();
  const { createServer } = require("http");
  const { Server } = require("socket.io");

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


  httpServer.listen(port, () => console.log(`listening on port ${port}`));


  const sales = require('../routes');

  app.use(cors());
  app.use(express.json());

  // Enrutadors
  app.use('/sales', routes.sales);

}

module.exports = initServer;