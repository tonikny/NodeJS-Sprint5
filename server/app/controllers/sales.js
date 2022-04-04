const SalesService = require('../services/sales');

module.exports = {

  getSales: async (req, res) => {
    const salesService = new SalesService();
    const sales = await salesService.obtenirSales();
    res.json({ msg: sales });
  },

  // crear sala
  crearSala: async (req, res) => {
    try {
      const salesService = new SalesService();
      await salesService.crearSala(req.body.nom, req.user.userId);
      res.status(200).json({ msg: 'Sala creada' })
    } catch (e) {
      //console.log('Error creant sala:', e);
      res.status(500).json({ error: 'Error creant sala' });
    }
    // sortir de sala
    //router.put("/surt/", controllers.sales.sortirDeSala);
    
    // obtenir sales
    //router.get("/", controllers.sales.getSales);
    
    
  },

  // usuari entra a sala
 /*  entrarASala: async (req, res) => {
    console.log('!!!!!!!!!!!!!!!!!!!!');
    try {
      const salesService = new SalesService();
      const u = req.user.userId;
      const s = req.body.salaId;
      await salesService.entrarASala(u, s);
      console.log('Usuari ' + u + ' entra a Sala ' + s );
      res.status(200).json({ msg: 'Usuari ' + u + ' entra a Sala ' + s })
    } catch (e) {
      console.log('Error entrant a sala:', e);
      res.status(500).json({ error: 'Error entrant a sala' });
    }
  }, */

  // usuari surt de la sala
  /* sortirDeSala: async (req, res) => {
    try {
      const salesService = new SalesService();
      const u = req.user.userId;
      await salesService.surtDeSala(u);
      res.status(200).json({ msg: 'Usuari ' + u + ' surt de Sala'})
    } catch (e) {
      //console.log('Error sortint de sala:', e);
      res.status(500).json({ error: 'Error sortint de sala' });
    }
  }, */

}
