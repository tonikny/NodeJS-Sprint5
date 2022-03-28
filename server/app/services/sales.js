const models = require('../models');
module.exports = {

  obtenirSales: async () => {
    try {
      const sales = await models.Sala.findAll({
        attributes: {
          include: [[models.Sequelize.fn("COUNT", models.Sequelize.col("connectatASala")), "nombreUsuaris"]],
        },
        include: [{
          model: models.User, attributes: []
        }],
        group: ['id'],
        raw: true
      });
      //this.sales.map(o => { console.log('---', o.dataValues) });
      this.sales = sales;
      console.log('-------Sales----------->', this.sales.map(o => o.nom));
      return this.sales;
    }
    catch (e) {
      throw (e);
    }
  },

  // crear sala
  crearSala: async (userId, nom) => {
    try {
      const sala = models.Sala.build({
        nom: nom,
        creadaPer: userId
      });
      return await sala.save();
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        console.error('Nom de sala duplicat');
      } else {
        console.error('Error db creant sala', e.original);
        throw (e);
      }
    }
  },

  // entrar a sala
  entrarASala: async (userId, salaId) => {
    console.log('Usuari ' + userId + ' entra a Sala ' + salaId);
    try {
      const res = await models.User.update({ connectatASala: salaId }, {
        where: {
          id: userId
        }
      });
      const sala = await models.Sala.findByPk(salaId, { raw: true });
      return sala;
    } catch (e) {
      console.error('Error db entrant a sala', e.original);
      throw (e);
    }
  },

  // sortir de sala
  /* sortirDeSala: async (id) => {
    try {
      await models.User.update({ connectatASala: null }, {
        where: {
          id: id
        }
      });
    } catch (e) {
      console.error('Error db sortint de sala', e.original);
      throw (e);
    }
  } */

}
