module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  })

  User.associate = function(db) {
    db.User.hasMany(db.Member)
    db.User.hasMany(db.Reply)
  }

  return User
}
