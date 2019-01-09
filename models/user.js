module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    // addressId: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    // Associating User with Types
    // When an User is deleted, also delete any associated Types
    User.hasMany(models.Type, {
      onDelete: "cascade"
    });
  };
  return User;
};
