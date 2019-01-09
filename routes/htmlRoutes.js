var db = require("../models");
const authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  // Load index page
  // app.get("/", function (req, res) {
  //   db.User.findAll({}).then(function (dbExamples) {

  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (userInfo) {
      res.render("index", {
        msg: "Welcome!",
        examples: userInfo
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
  app.get("/user/:username", function (req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function (dbExample) {
      res.render("user", {
        username: req.params.username,
        // email: req.params.email
        // address:req.params.address

      });
    });
  });

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

  app.get("/user", isLoggedIn, function (req, res) {
    console.log("just passport", req.session);
    db.User
      .findAll({
        where: {
          id: req.session.passport.user
        }
      })
      .then(function (data) {
        console.log("hi user", data[0].username);
        res.render("user", {
          username: data[0].username,
          id: data[0].id
          // id: data[0].id,
          address: data[0].address
        });
      });
  });

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