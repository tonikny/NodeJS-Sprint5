module.exports = (sequelize, type) => {
  return sequelize.define('missatge', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    salaId: {
      type: type.INTEGER,
      allowNull: false
    },
    userId: {
      type: type.INTEGER
    },
  }, {
    createdAt: true,
    updatedAt: false,
    tableName: 'missatges'
  })
}
