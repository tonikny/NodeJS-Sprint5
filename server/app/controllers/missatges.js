const missatgesService = require('../services/missatges');

module.exports = {

  getMissatgesSala: async (req, res) => {
    missatges = await missatgesService.obtenirMissatgesSala(req.body.salaId);
    res.json({ msg: missatges });
  },

  // crear sala
  crearMissatge: async (req, res) => {
    try {
      await missatgesService.crearMissatge(req.body.text, req.body.salaId, req.body.userId);
      res.status(200).json({ msg: 'Missatge creat' })
    } catch (e) {
      //console.log('Error creant missatge:', e);
      res.status(500).json({ error: 'Error creant missatge' });
    }
  },

}
