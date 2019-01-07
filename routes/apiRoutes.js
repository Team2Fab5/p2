// var db = require("../models");

// module.exports = function (app) {
//   // Get all examples for user
//   app.get("/api/examples", function (req, res) {
//     db.user
//       .findAll({})
//       .then(function (dbExamples) {
//         res.json(dbExamples);
//       });
//   });
//   // // get all for scores 
//   // app.get("/api/scores", function (req, res) {
//   //   db.score.findAll({}).then(function (dbExamples) {
//   //     res.json(dbExamples);
//   //   });
//   // });
//   // //get all for requested tasks 
//   // app.get("/api/requested_tasks", function (req, res) {
//   //   db.requested_task.findAll({}).then(function (dbExamples) {
//   //     res.json(dbExamples);
//   //   });
//   // });


//   // Get all users
//   app.get("/api/users", function (req, res) {
//     db.user
//       .findAll({}) // returns a promise
//       .then(function (users) { // the first and only param to the callback is the value of the resolved promise
//         res.json(users)
//       })
//       .catch(function (pinkPony) {
//         console.log(pinkPony)
//         // catch any potential errors with the db call and maybe have some plan b
//         // send back an error to the client
//         res.status(500).json({
//           message: "Something went wrong getting users!"
//         })
//       })
//   })



//   // //get all for address  
//   // app.get("/api/address", function (req, res) {
//   //   db.address.findAll({}).then(function (dbExamples) {
//   //     res.json(dbExamples);
//   //   });
//   // });

//   // app.get("/api/completed_task", function (req, res) {
//   //   db.completed_task.findAll({}).then(function (dbExamples) {
//   //     res.json(dbExamples);
//   //   });
//   // });

//   // Create a new example user 

//   app.post("/api/examples", function (req, res) {
//     db.user.create(req.body).then(function (dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // // for scores
//   // app.post("/api/scores", function (req, res) {
//   //   db.scores.create(req.body).then(function (dbExample) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for requested task 
//   // app.post("/api/requested_tasks", function (req, res) {
//   //   db.requested_task.create(req.body).then(function (dbExample) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for address 
//   // app.post("/api/address", function (req, res) {
//   //   db.address.create(req.body).then(function (dbExample) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   //Create a new user
//   app.post("api/users", function (req, res) {
//     db.user.create(req.body.username).then(function (dbExample) {
//       res.json({
//         username: result.username
//       });
//     })
//   })


//   // Delete an example by id for user db

//   app.delete("/api/examples/:id", function (req, res) {

//     db.user.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (
//       dbExample
//     ) {
//       res.json(dbExample);
//     });
//   });

//   //for scores db 
//   // app.delete("/api/scores/:id", function (req, res) {
//   //   db.scores.destroy({
//   //     where: {
//   //       id: req.params.id
//   //     }
//   //   }).then(function (
//   //     dbExample
//   //   ) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for the requested task db 
//   // app.delete("/api/requested_task/:id", function (req, res) {
//   //   db.requested_task.destroy({
//   //     where: {
//   //       id: req.params.id
//   //     }
//   //   }).then(function (
//   //     dbExample
//   //   ) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for address 
//   // app.delete("/api/address/:id", function (req, res) {
//   //   db.address.destroy({
//   //     where: {
//   //       id: req.params.id
//   //     }
//   //   }).then(function (
//   //     dbExample
//   //   ) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for completed task
//   // app.delete("/api/completed_task/:id", function (req, res) {
//   //   db.completed_task.destroy({
//   //     where: {
//   //       id: req.params.id
//   //     }
//   //   }).then(function (
//   //     dbExample
//   //   ) {
//   //     res.json(dbExample);
//   //   });
//   // });

//   // //for type 
//   // app.delete("/api/type/:id", function (req, res) {
//   //   db.type.destroy({
//   //     where: {
//   //       id: req.params.id
//   //     }
//   //   }).then(function (
//   //     dbExample
//   //   ) {
//   //     res.json(dbExample);
//   //   });
//   // });
// }

var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};