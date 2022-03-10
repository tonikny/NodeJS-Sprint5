const { config } = require('../config/config');
const { db: { host, port, user, pass, name, debug, recreate } } = config;
const dbUrl = `mysql://${user}:${pass}@${host}:${port}/${name}`;

const mysql = require('mysql2/promise');
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(dbUrl, { logging: debug })

// Models
const User = require('./user')(sequelize, DataTypes);
const Sala = require('./sala')(sequelize, DataTypes);
const Missatge = require('./missatge')(sequelize, DataTypes);

// Relacions
User.belongsTo(Sala, { foreignKey: 'connectatASala' });
Sala.hasMany(User, { foreignKey: 'connectatASala' });
Sala.belongsTo(User, { foreignKey: 'creadaPer', constraints: false });
User.hasMany(Sala, { foreignKey: 'creadaPer', constraints: false });
const fk_creadaPer = {
  type: 'foreign key',
  fields: ['creadaPer'],
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  references: {
    table: 'users',
    field: 'id',
  }
}
Missatge.belongsTo(User);
User.hasMany(Missatge, { foreignKey: 'userId' });
Missatge.belongsTo(Sala);
Sala.hasMany(Missatge, { foreignKey: 'salaId' });



// Inicialitzar BD, si cal
(async () => {

  if (recreate) {
    try {
      const conn = await mysql.createConnection({ host, port, user, password: pass });
      await conn.query(`DROP DATABASE IF EXISTS \`${name}\`;`);
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
    } catch (e) {
      console.error('No es pot recrear a la bd', e);
    }
  }
  try {
    await sequelize.sync({ force: recreate });
  } catch (e) {

  }

  if (recreate) {
    try {
      const queryInterface = sequelize.getQueryInterface();
      const addMediaUserForeignKey = queryInterface.addConstraint(
        'sales', fk_creadaPer
      ).catch((e) => {
        console.error('Error en crear foreign key', e);
        throw (e)
      });
        
      await Sala.bulkCreate([
        { id: 1, nom: 'sala1' },
        { id: 2, nom: 'salaX' }
      ]);
      await User.bulkCreate([
        {
          id: 1, nom: 'toni', email: 'a@a.com', connectatASala: 2,
          password: '$2b$10$WHYgUsrzxqnM2nj2QDsUyOHWg0Fdkgoig0sN9bVAnQnMrZY2cK1bS'
        }, // password = 'xxx'
      ]);
      console.log(`Tables created & populated!`)
    } catch (e) {
      console.error('Error inserint dades');
      throw (e);
    }
  }
})();

module.exports = {
  User,
  Sala,
  Missatge,
  Sequelize
}
