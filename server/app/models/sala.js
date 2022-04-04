module.exports = (sequelize, type) => {
  return sequelize.define('sala', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    descripcio: {
      type: type.STRING
    },
    creadaPer: {
      type: type.INTEGER,
      allowNull:true,
      defaultValue:null
    }
  }, {
    createdAt: true,
    updatedAt: false,
    tableName: 'sales'
  })
}
