module.exports = function(sequelize, DataTypes) {
    var requested_task = sequelize.define("requested_task", {
      ID: DataTypes.INTEGER,
      taskTypeId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      taskStatus: DataTypes.INTEGER,
      actionDate: DataTypes.DATE
    });
    return requested_task;
  };
