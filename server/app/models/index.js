const { config } = require('../config/config');
const { db: { host, port, user, pass, name, debug, recreate } } = config;
const dbUrl = `mysql://${user}:${pass}@${host}:${port}/${name}`;

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(dbUrl, { logging: debug })

// Models
const User = require('./user')(sequelize, DataTypes);
const Sala = require('./sala')(sequelize, DataTypes);
const Missatge = require('./missatge')(sequelize, DataTypes);

// Relacions
User.belongsTo(Sala);
Sala.hasMany(User, { foreignKey: 'connectatASala'});
Missatge.belongsTo(User);
User.hasMany(Missatge, { foreignKey: 'userId' });
Missatge.belongsTo(Sala);
Sala.hasMany(Missatge, { foreignKey: 'salaId' });

// Inicialitzar BD, si cal
(async () => {
  await sequelize.sync({ force: recreate });
  if (recreate) {
    await Sala.bulkCreate([
      { id: 1, nom: 'sala1' },
      { id: 2, nom: 'salaX' }
    ]);
    await User.bulkCreate([
      { id: 1, nom: 'toni', email: 'a@a.com', connectatASala: 2,
      password: '$2b$10$WHYgUsrzxqnM2nj2QDsUyOHWg0Fdkgoig0sN9bVAnQnMrZY2cK1bS' }, // password = 'xxx'
    ]);
  }
  console.log(`Tables created & populated!`)
})();

module.exports = {
  User,
  Sala,
  Missatge,
  Sequelize
}
