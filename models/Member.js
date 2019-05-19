module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    "member",
    {
      position: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "USER",
      },
    },
    {
      timestamps: false,
    },
  )

  Member.associate = function(db) {
    db.Member.belongsTo(db.Board)
    db.Member.belongsTo(db.User)
  }
  return Member
}
