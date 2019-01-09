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


  // User.associate = function (models) {
  //   User.hasMany(models.User, {
  //     as: "Neighbors",
  //     foreignKey: "NeighborId"
  //   });
  //   User.belongsToMany(models.User, {
  //     through: "Neighbors"
  //   })
  // };
  return User;
};