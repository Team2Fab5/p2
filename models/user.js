module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    // userId: DataTypes.INTEGER,
    username: DataTypes.STRING,

    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return user;
};
