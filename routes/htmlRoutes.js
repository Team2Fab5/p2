var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.user.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Let's find your neighbors!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.user.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //Load user page
  app.get("/user/:id", function (req, res) {
    db.user.findOne({
      where: {
        id: req.params.id,
        userId: req.params.userId,
        username: req.params.username,
        email: req.params.email,
        password: req.params.password,
      }
    }).then(function (
      dbExample
    ) {
      res.render("user", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};