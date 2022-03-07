module.exports = (sequelize, type) => {
  return sequelize.define('sala', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: type.STRING,
      allowNull: false
    }
  }, {
    createdAt: true,
    updatedAt: false,
    tableName: 'sales'
  })
}
