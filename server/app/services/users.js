const models = require('../models');

class UserService {

  static async obtenirUsers() {
    const users = await models.User.findAll({raw: true});
    return users;
  }

  static async obtenirUser(id) {
    const user = await models.User.findByPk(id, {raw: true});
    if (user === null) {
      console.log('Not found!');
    }
    return user;
  }

  static async modificarUser(id, dades) {
    try {
      const result = await models.User.update(dades, { where: { id: id } });
      return (result[0] != 0)
    }
    catch (e) { throw (e) }
  }

  static async esborrarUser(id) {
    try {
      const result = await models.User.destroy({ where: { id: id } });
      return (result !== 0)
    }
    catch (e) { throw (e) }
  }

  static async surtSala(userId) {
    UserService.modificarUser(userId, { connectatASala: null });
  };

  static async nombreUsuarisSala(SalaId) {
    try {
      return await models.User.count({ where: { connectatASala: SalaId }, raw: true });
    }
    catch (e) { throw (e) }
  }

  static async obtenirUsuarisSala(salaId) {
    const users = await models.User.findAll({
      where: {
        connectatASala: salaId
      },
      order: [
        ['updatedAt']
      ],
      raw: true
    });
    return users;
  }

}

module.exports = UserService;