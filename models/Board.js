module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("board", {
    title: DataTypes.STRING,
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Board.associate = function(db) {
    db.Board.hasMany(db.List)
    db.Board.hasMany(db.Member)
  }

  return Board
}
