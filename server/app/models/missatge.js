module.exports = (sequelize, type) => {
  return sequelize.define('missatge', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: type.STRING,
      allowNull: false
    },
    salaId: {
      type: type.INTEGER,
      allowNull: false
    },
    userId: {
      type: type.INTEGER,
      allowNull: false
    },
  }, {
    createdAt: true,
    updatedAt: false,
    tableName: 'missatges'
  })
}
