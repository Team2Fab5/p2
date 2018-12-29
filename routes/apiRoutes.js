var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.user.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });



  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.user.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {

    db.user.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};