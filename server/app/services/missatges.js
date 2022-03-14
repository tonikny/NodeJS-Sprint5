const models = require('../models');
const missatge = require('../models/missatge');

class MissatgesService {

  static async obtenirMissatgesSala(salaId) {
    const missatges = await models.Missatge.findAll({
      where: {
        salaId: salaId
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 50
    });
    return missatges;
  }

  static async crearMissatge(id) {
    try {
      const missatge = models.Missatge.build({
        text: text,
        salaId: salaId,
        userId: userId
      });
      await missatge.save();
    } catch (e) {
      console.error('Error db creant nissatge', e.original);
      throw (e);
    }
  }

}

module.exports = MissatgesService;