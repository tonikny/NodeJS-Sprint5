const { Server } = require("socket.io");
const cors = require('cors');
const missatgesService = require('../services/missatges');
const salesService = require('../services/sales');
const usersService = require('../services/users');
const authService = require('./currentuser');
const checkToken = require('../helpers/auth')
const { jwtSecretToken } = require("../config/config");
const currentUser = require('../services/currentuser');

const initSocket = (httpServer) => {

  const io = new Server(httpServer, {
    cors: {
      origins: ["*"]
    }
  });

  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  /*   io.use((socket, next) => {
      console.log('token:', socket.handshake.query['x-token']);
      if (socket.handshake.query && socket.handshake.query['x-token']) {
        jwt.verify(socket.handshake.query['x-token'], jwtSecretToken.token, (err, decoded) => {
          if (err) {
            console.log('ERROR');
            return next(new Error('Authentication error'));
          }
          socket.decoded = decoded;
          console.log('decoded:', decoded);
          next();
        });
      }
      else {
        console.log('error token');
        next(new Error('Authentication error'));
      }
    }) */
  io.on('connection', async (socket) => {
    console.log('user connected');

    let previousSalaId;
    const safeJoin = currentSalaId => {
      socket.leave(previousSalaId);
      socket.join(currentSalaId, () => console.log(`Socket ${socket.id} joined room ${currentSalaId}`));
      //console.log('Socket-Entrant a sala:', socket.rooms); // Set { <socket.id> }
      previousSalaId = currentSalaId;
    };
    // const userToken = socket.handshake.query['x-token'];
    // console.log(userToken);
    // let user = undefined;
    // if (userToken) {
    //   user = checkToken(userToken);
    // } else {
    //   console.log('Autenticació fallida');
    //   return socket.disconnect();
    // }  

    const llista = await salesService.obtenirSales();
    io.emit('llista_sales_resp', await salesService.obtenirSales());
    /*    socket.on("llista_sales", async () => {
         const llista = await salesService.obtenirSales();
         io.emit('llista_sales_resp', llista);
       }); */

    socket.on('crea_sala', async (nom) => {
      const userId = currentUser.getData().userId;
      const sala = await salesService.crearSala(userId, nom);
      io.emit('sala_creada_resp', sala);
    });


    // subscribe person to chat & other user as well
    socket.on("entra_sala", async (salaId) => {
      console.log('socket-on.entra');
      try {
        const user = currentUser.getData();
        const userId = user.userId;
        //const userId = authService.getSessionUser();
        if (!userId) throw new Error('No hi ha userId');
        const sala = await salesService.entrarASala(userId, salaId);
        if (!sala) throw new Error('No hi ha sala');

        if (previousSalaId) {
          io.to(salaId.toString()).emit('usuari_surt', socket.id);
          socket.leave(salaId.toString());
        }
        safeJoin(salaId.toString());
        //console.log('Entrant a sala', sala);
        socket.emit('sala_escollida', sala);
      } catch (e) {
        console.log('Error entrant a sala', e);
      }
      socket.join(salaId.toString());
      //io.emit('llista_sales', await salesService.obtenirSales());
      io.to(salaId.toString()).emit('llista_missatges', await missatgesService.obtenirMissatgesSala(salaId));
    });

    socket.on('nou_missatge', async (message) => {
      console.log('socket-service:', message, socket.rooms);
      try {
        await missatgesService.crearMissatge(message);
        io.to(message.salaId.toString()).emit('nou_missatge_resp', message);
        //io.emit('missatges', message);
      } catch (e) {
        console.log('ERROR SOCKET');
      }
    });

    socket.on('disconnect', async (motiu) => {
      console.log('user disconnected!', motiu);
      try {
        await usersService.surtSala(currentUser.getData().userId);
      } catch (error) {
        console.log('Cap usuari...', currentUser.getData());
      }
    });
  });

}

module.exports = initSocket;