var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    //for user 
    db.user.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome to Neighborly!",
        examples: dbExamples
      });

    });

    //for score 
    db.score.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });

    });
    //for requested task db 
    db.requested_task.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });

    });

    //for address 
    db.address.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });

    });


    //for completed tasks
    db.completed_task.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });

    });



    //for type 
    db.type.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });

    });



  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {

    db.user.findOne({ where: { id: req.params.id } }).then(function (

      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });

    db.scores.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });


    db.requested_task.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });

    db.address.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });


    db.completed_task.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });

    db.type.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });


  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};