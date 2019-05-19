module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("list", {
    title: DataTypes.STRING,
    order: DataTypes.INTEGER,
  })

  List.associate = function(db) {
    db.List.belongsTo(db.Board)
    db.List.hasMany(db.Card)
  }

  return List
}
