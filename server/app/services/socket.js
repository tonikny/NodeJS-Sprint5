const { Server } = require("socket.io");
const cors = require('cors');
const missatgesService = require('../services/missatges');


const initSocket = (httpServer) => {

  const io = new Server(httpServer, {
    cors: {
      origins: ["*"]
    }
  });
  io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (message) => {
      missatgesService.crearMissatge(message,1,1); //TODO obtenir salaId i userId
      //console.log(message);
      io.emit('message', `${socket.id.substring(0, 2)} \u27A5 ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected!');
    });
  });

}

module.exports = initSocket;