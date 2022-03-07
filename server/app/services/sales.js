const models = require('../models');

class SalaService {

  static async obtenirSales() {

    const sales = await models.Sala.findAll();
    //console.log(sales);
    return sales;
  }

}

module.exports = SalaService;