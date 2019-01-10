module.exports = function(sequelize, DataTypes) {
    var Type = sequelize.define("Type", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });

    Type.associate = function(models) {
      // We're saying that a Type should belong to an User
      // A Type can't be created without an User due to the foreign key constraint
      Type.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Type;
  };