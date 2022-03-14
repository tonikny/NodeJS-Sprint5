const { Server } = require("socket.io");
const cors = require('cors');

const initSocket = (httpServer) => {

  const io = new Server(httpServer, {
    cors: {
      origins: ["*"]
    }
  });
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) => {
      console.log(message);
      io.emit('message', `${socket.id.substring(0, 2)} \u27A5 ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });
  });

}

module.exports = initSocket;