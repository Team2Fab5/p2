// module.exports = function (sequelize, DataTypes) {
//   var User = sequelize.define("User", {
//     userId: DataTypes.INTEGER,
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return User;
};