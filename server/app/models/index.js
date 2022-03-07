const { config } = require('../config/config');
const { db: { host, port, user, pass, name, debug, recreate } } = config;
const dbUrl = `mysql://${user}:${pass}@${host}:${port}/${name}`;

const { Sequelize, DataTypes } = require('sequelize')
//const UserModel = require('./models/user')
const SalaModel = require('./sala')
//const TagModel = require('./models/tag')

const sequelize = new Sequelize(dbUrl, { logging: debug })

//const User = UserModel(sequelize, DataTypes)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
//const BlogTag = sequelize.define('blog_tag', {})
const Sala = SalaModel(sequelize, DataTypes);
//const Tag = TagModel(sequelize, Sequelize)

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
// Blog.belongsTo(User);


(async () => {
  await sequelize.sync({ force: recreate });
  if (recreate) {
    await Sala.bulkCreate([
      { id: 1, nom: 'sala1' },
      { id: 2, nom: 'salaX' }
    ]);
  }
  console.log(`Tables created & populated!`)
})();

module.exports = {
  //User,
  Sala,
  //Tag
}
