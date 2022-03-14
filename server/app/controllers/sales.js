const salesService = require('../services/sales');

module.exports = {

  getSales: async (req, res) => {
    sales = await salesService.obtenirSales();
    res.json({ msg: sales });
  },

  // crear sala
  crearSala: async (req, res) => {
    try {
      await salesService.crearSala(req.body.nom, req.user.userId);
      res.status(200).json({ msg: 'Sala creada' })
    } catch (e) {
      //console.log('Error creant sala:', e);
      res.status(500).json({ error: 'Error creant sala' });
    }
  },

  //TODO: entrar a sala
  entrarASala: async (req, res) => { },

}
