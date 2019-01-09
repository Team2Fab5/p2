var db = require("../models");
const authController = require("../controllers/authcontroller.js");
const task = require("../models/rTasks");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    db.user.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/tasks", function (req, res) {
    db.requested_task.findAll({}).then(function (dbTasks) {
      res.render("task", {
        msg: "Here are your tasks",
        tasks: dbTasks
      });
    });
  });

  // Load Neighborhood Page
  app.get("/neighborhood", function (req, res) {
    res.render("neighborhood");
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
  //passport
  app.get("/signup", authController.signup);
  app.get("/signin", authController.signin);
  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/dashboard",
      failureRedirect: "/signup"
    })
  );
  app.get("/dashboard", isLoggedIn, authController.dashboard);
  app.get("/logout", authController.logout);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

      failureRedirect: "404"
    })
  );
  app.get("/task", authController.task);
  app.get("/dashboard", authController.dashboard);

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/task",
      failureRedirect: "404"
    })
  );
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/signup");
  }
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
