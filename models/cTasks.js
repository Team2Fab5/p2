module.exports = function(sequelize, DataTypes) {
    var completed_task = sequelize.define("completed_task", {
      ID: DataTypes.INTEGER,
      taskId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      completedDate: DataTypes.DATE
    });
    return completed_task;
  };