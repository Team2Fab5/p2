module.exports = function (sequelize, DataTypes) {
  var Requested_task = sequelize.define("Requested_task", {
    taskType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    taskStatus: DataTypes.INTEGER,
    actionDate: DataTypes.DATE
  });

  return Requested_task;
};