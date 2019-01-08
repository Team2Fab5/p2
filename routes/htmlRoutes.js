var db = require("../models");
const authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  // Load index page
  app.get("/", function (req, res) {
    db.User.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
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

  app.post(
    "/signin",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",

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