module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("card", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    order: DataTypes.INTEGER,
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Card.associate = function(db) {
    db.Card.belongsTo(db.List, { onDelete: "CASCADE" })
    db.Card.hasMany(db.Reply)
  }

  return Card
}
