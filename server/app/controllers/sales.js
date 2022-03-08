const salesService = require('../services/sales');

module.exports = {

  getSales: async (req, res) => {
    console.log('obtenir sales');

    sales = await salesService.obtenirSales();

    res.json(sales);
  }

}
