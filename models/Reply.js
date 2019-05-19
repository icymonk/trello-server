module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define("reply", {
    content: DataTypes.STRING,
  })

  Reply.associate = function(db) {
    db.Reply.belongsTo(db.Card, { onDelete: "CASCADE" })
    db.Reply.belongsTo(db.User, { onDelete: "CASCADE" })
  }

  return Reply
}
