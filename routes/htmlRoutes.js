var db = require("../models");
const authController = require("../controllers/authcontroller.js");

module.exports = function (app, passport) {
  // Load index page
  
  app.get("/", function(req, res) {
    db.user.findAll({}).then(function(userInfo) {
 
      res.render("index", {
        msg: "Welcome!",
        examples: userInfo
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
  // app.get("/user", isLoggedIn, authController.user).then(function(req, res) {
  //   console.log(req.user);
  //   res.render("user", { id: req.user.username });
  // });
  app.get(
    "/user",
    //isLoggedIn, authController.user,
    function(req, res) {
      console.log("we got past the first function");
      db.user.findAll({ where: { id: 20 } }).then(function(data) {
        console.log("hi user", data[0].username);
        res.render("user", {
          username: data[0].username,
          id: data[0].id
        });
      });
    }
  );
  // app.get("/", function(req, res) {
  //   db.user.findAll({}).then(function(userInfo) {
  //     console.log("the dude abides", userInfo);
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: userInfo
  //     });
  //   });
  // });
  // Create all our routes and set up logic within those routes where required.

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
