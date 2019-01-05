var db = require("../models");
const authController = require("../controllers/authcontroller.js");


module.exports = function(app, passport) {
  // Load index page
  app.get("/", function(req, res) {
    db.user.findAll({}).then(function(dbExamples) {


//     //for user 
  
//       res.render("index", {

//         msg: "Let's find your neighbors!",
//         examples: dbExamples
//       });

//     });

//     //for score 
//     db.score.findAll({}).then(function (dbExamples) {

//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });

//     });
//     //for requested task db 
//     db.requested_task.findAll({}).then(function (dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });

//     });

//     //for address 
//     db.address.findAll({}).then(function (dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });

//     });


//     //for completed tasks
//     db.completed_task.findAll({}).then(function (dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });

//     });



//     //for type 
//     db.type.findAll({}).then(function (dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });

//     });



//   });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {

    db.user.findOne({ where: { id: req.params.id } }).then(function (

      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });

//     db.scores.findOne({ where: { id: req.params.id } }).then(function (
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });


//     db.requested_task.findOne({ where: { id: req.params.id } }).then(function (
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });

//     db.address.findOne({ where: { id: req.params.id } }).then(function (
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });


//     db.completed_task.findOne({ where: { id: req.params.id } }).then(function (
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });

//     db.type.findOne({ where: { id: req.params.id } }).then(function (
//       dbExample
//     ) {
//       res.render("example", {
//         example: dbExample
//       });
//     });


//   });


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
    "/",
    passport.authenticate("local-signin", {
      successRedirect: "/dashboard",
      failureRedirect: "/"
    })
  );

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

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};

