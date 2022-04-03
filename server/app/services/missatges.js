const models = require('../models');
const missatge = require('../models/missatge');
const user = require('../models/user');

class MissatgesService {

  static async obtenirMissatgesSala(salaId) {
    const missatges = await models.Missatge.findAll({
      where: {
        salaId: salaId
      },
      include: { model:models.User, attributes: ['nom']},
      order: [
        ['createdAt']
      ],
      limit: 50,
      raw: true
    });
    return missatges;
  }

  static async crearMissatge(m) {
    try {
      console.log('Missatge.service-crearMissatge:',m);
      const missatge = models.Missatge.build({
        text: m.text,
        salaId: m.salaId,
        userId: m.userId
      },{raw: true});
      return await missatge.save();
    } catch (e) {
      console.error('Error db creant missatge', e);
      throw (e);
    }
  }

}

module.exports = MissatgesService;