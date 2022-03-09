module.exports = (sequelize, type) => {
  return sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: type.STRING,
      allowNull: false
    },
    email: {
      type: type.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    connectatASala: {
      type: type.INTEGER,
    }
  }, {
    createdAt: true,
    updatedAt: true,
    tableName: 'users'
  })
}
