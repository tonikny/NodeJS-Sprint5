const { Server } = require("socket.io");
const cors = require('cors');
const missatgesService = require('./missatges');
const salesService = require('./sales');
const usersService = require('./users');
const authService = require('./auth');
const checkToken = require('../helpers/auth')
const { jwtSecretToken } = require("../config/config");

const initSocket = (httpServer) => {

  const io = new Server(httpServer, {
    cors: {
      origins: ["*"]
    }
  });

  io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

  io.on('connection', async (socket) => {
    console.log('user connected');

    // canvi de rooms de socket.io
    let previousSalaId;
    const safeJoin = currentSalaId => {
      socket.leave(previousSalaId);
      socket.join(currentSalaId); //, () => console.log(`Socket ${socket.id} joined room ${currentSalaId}`));
      previousSalaId = currentSalaId;
    };

    // obtenir sales
    const llista = await salesService.obtenirSales();
    io.emit('llista_sales_resp', await salesService.obtenirSales());

    // crear sala
    socket.on('crea_sala', async (userId, nom) => {
      const sala = await salesService.crearSala(userId, nom);
      io.emit('sala_creada_resp', sala);
    });

    // entra a sala
    socket.on("entra_sala", async (userId, salaId) => {
      try {
        if (!userId) throw new Error('No hi ha userId');
        const sala = await salesService.entrarASala(userId, salaId);
        if (!sala) throw new Error('No hi ha sala');

        if (previousSalaId) {
          socket.leave(salaId.toString());
        }
        safeJoin(salaId.toString());
        socket.emit('sala_escollida', sala);
      } catch (e) {
        console.log('Error entrant a sala');
      }
      socket.join(salaId.toString());
      //io.emit('llista_sales', await salesService.obtenirSales());
      io.to(salaId.toString()).emit('llista_missatges', await missatgesService.obtenirMissatgesSala(salaId));
      io.emit('llista_usuaris', await usersService.obtenirUsers());
    });

    // missatge nou
    socket.on('nou_missatge', async (message) => {
      try {
        const missDesat = await missatgesService.crearMissatge(message);
        const userData = await usersService.obtenirUser(missDesat.userId);
        missDesat.setDataValue('user.nom',userData.nom);
        io.to(message.salaId.toString()).emit('nou_missatge_resp', missDesat);
      } catch (e) {
        console.log('ERROR SOCKET',e);
      }
    });

    // logout
    socket.on('logout', async (userId) => {
      await usersService.surtSala(userId);
      io.emit('llista_usuaris', await usersService.obtenirUsers());
    });

    // disconnect
    socket.on('disconnect', async (motiu) => {
      console.log('user disconnected!', motiu);
    });
  });

}

module.exports = initSocket;
