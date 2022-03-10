const models = require('../models');

class SalaService {

  static async obtenirSales() {
    try {
      const sales = await models.Sala.findAll({
        attributes: {
          include: [[models.Sequelize.fn("COUNT", models.Sequelize.col("connectatASala")), "nUsuaris"]]
        },
        include: [{
          model: models.User, attributes: []
        }],
        group: ['id']
      });
      return sales;
    }
    catch (e) {
      //
    }
  }

  // crear sala
  static async crearSala(nom, userId) {
    try {
      const sala = models.Sala.build({
        nom: nom,
        creadaPer: userId
      });
      await sala.save();
    } catch (e) {
      console.error('Error db creant sala', e.original);
      throw(e);
    }
  }

  //TODO: entrar a sala
  static async entrarASala(id) {

  }

}

module.exports = SalaService;
