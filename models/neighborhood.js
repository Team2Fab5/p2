module.exports = function (sequelize, DataTypes) {
    var Neighborhood = sequelize.define("User", {
        neighborId: DataTypes.INTEGER,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    Neighborhood.associate = function (models) {
        Neighborhood.hasMany(models.User, {
            as: "Neighbors",
            foreignKey: "NeighborId"
        });
        User.belongsToMany(models.Neighborhood, {
            through: "Neighbors"
        })
    };
    return Neighborhood;
}