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

    }
  }
}

module.exports = SalaService;
