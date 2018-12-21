module.exports = function(sequelize, DataTypes) {
    var address = sequelize.define("address", {
      ID: DataTypes.INTEGER,
      mapsCoords: DataTypes.DECIMAL,
      longAddress: DataTypes.STRING
    });
    return address;
  };
