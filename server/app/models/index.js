const { config } = require('../config/config');
const { db: { host, port, user, pass, name, debug, recreate } } = config;
const dbUrl = `mysql://${user}:${pass}@${host}:${port}/${name}`;

const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./user')
const SalaModel = require('./sala')
const MissatgeModel = require('./missatge')

const sequelize = new Sequelize(dbUrl, { logging: debug })

// Models
const User = UserModel(sequelize, DataTypes);
const Sala = SalaModel(sequelize, DataTypes);
const Missatge = MissatgeModel(sequelize, DataTypes);

// Relacions
User.hasMany(Missatge, { foreignKey: 'userId' });
Missatge.belongsTo(User);
Sala.hasMany(Missatge, { foreignKey: 'salaId' });
Missatge.belongsTo(Sala);

// Inicialitzar BD, si cal
(async () => {
  await sequelize.sync({ force: recreate });
  if (recreate) {
    await Sala.bulkCreate([
      { id: 1, nom: 'sala1' },
      { id: 2, nom: 'salaX' }
    ]);
    await User.bulkCreate([
      { id: 1, nom: 'toni', email: 'a@a.com', password: '$2b$10$WHYgUsrzxqnM2nj2QDsUyOHWg0Fdkgoig0sN9bVAnQnMrZY2cK1bS' }, // password = 'xxx'
    ]);
  }
  console.log(`Tables created & populated!`)
})();

module.exports = {
  User,
  Sala,
  Missatge
}
