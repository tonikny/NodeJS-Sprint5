const userService = require('../services/users');

module.exports = {

  getUsers: async (req, res, next) => {
    try {
      const users = await userService.obtenirUsers();
      res.status(200).json(users);
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  },

  getUser: async (req, res, next) => {
    console.log('Server: user id:', req.params.id);
    if (req.params.id) {
      const user = await userService.obtenirUser(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'No existeix usuari' })
      }
    } else {
      res.status(400).json({ error: 'Bad Request' })
    }
  },

  updateUser: async (req, res, next) => {
    try {
      if (req.body && Object.keys(req.body).length === 0) {
        res.status(400).json({ error: 'Bad Request' })
      } else {
        const result = await userService.modificarUser(req.params.id, req.body);
        if (result) {
          res.status(200).json({ msg: 'Usuari modificat' })
        } else {
          res.status(404).json({ error: 'Usuari no trobat' })
        }
      }
    } catch (e) {
      console.log('Error:', e);
      res.status(500).json({ error: e.message });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const result = await userService.esborrarUser(req.params.id);
      //console.log(result);
      if (result) {
        res.status(200).json({ msg: 'Usuari esborrat' })
      } else {
        res.status(404).json({ error: 'Usuari no trobat' })
      }
    } catch (e) {
      console.log('Error:', e);
      res.status(500).json({ error: e.message });
    }
  }

}
