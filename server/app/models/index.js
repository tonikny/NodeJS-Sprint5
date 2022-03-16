const { config } = require('../config/config');
const { db: { host, port, user, pass, name, debug, recreate, populate } } = config;
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

Missatge.belongsTo(User);
User.hasMany(Missatge, { foreignKey: 'userId' });

Missatge.belongsTo(Sala);
Sala.hasMany(Missatge, { foreignKey: 'salaId' });



// Inicialitzar BD, si cal
(async () => {

  if (recreate) {
    // creacio de base de dades
    try {
      const conn = await mysql.createConnection({ host, port, user, password: pass });
      await conn.query(`DROP DATABASE IF EXISTS \`${name}\`;`);
      await conn.query(`CREATE DATABASE IF NOT EXISTS \`${name}\`;`);
    } catch (e) {
      console.error('No es pot recrear a la bd', e);
      process.exit();
    }
  }
  // creacio de taules i relacions (menys 'creadaPer')
  try {
    await sequelize.sync({ force: recreate });
  } catch (e) {

  }

  if (recreate) {
    // crear la foreign key 'creadaPer', que no es pot crear amb relacions
    // directes per problemes de circularitat
    try {
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
      const queryInterface = sequelize.getQueryInterface();
      const addMediaUserForeignKey = queryInterface.addConstraint(
        'sales', fk_creadaPer
      ).catch((e) => {
        console.error('Error en crear foreign key', e);
        process.exit();
      });
      console.log(`Tables created!`)

      // Dades de prova
      if (populate) {
        await User.bulkCreate([
          {
            id: 1, nom: 'aaa', email: 'a@a.com',
            password: '$2b$10$WHYgUsrzxqnM2nj2QDsUyOHWg0Fdkgoig0sN9bVAnQnMrZY2cK1bS'
          }, // password = 'xxx'
          {
            id: 2, nom: 'toni', email: 'toni',
            password: '$2b$10$WHYgUsrzxqnM2nj2QDsUyOHWg0Fdkgoig0sN9bVAnQnMrZY2cK1bS'
          }, // password = 'xxx'
        ]);
        await Sala.bulkCreate([
          { id: 1, nom: 'sala1', creadaPer: 1 },
          { id: 2, nom: 'salaX', creadaPer: 1 }
        ]);
        console.log(`Tables populated!`)
      }
    } catch (e) {
      console.error('Error inserint dades', e.original);
      process.exit();
    }
  }
})();

module.exports = {
  User,
  Sala,
  Missatge,
  Sequelize
}
