module.exports = function (sequelize, DataTypes) {
  var requested_task = sequelize.define("requested_task", {
    taskType: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    points: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    actionDate: DataTypes.DATE
  });
  return requested_task;
};