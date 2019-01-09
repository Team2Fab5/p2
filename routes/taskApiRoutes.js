// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the tasks
  app.get("/api/tasks", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Type.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
  
  // Get route for retrieving a single Type
  app.get("/api/tasks/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Type.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // post route for saving a new Type
  app.post("/api/tasks", function(req, res) {
    db.Type.create(req.body).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // DELETE route for deleting tasks
  app.delete("/api/tasks/:id", function(req, res) {
    db.Type.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // PUT route for updating tasks
  app.put("/api/tasks", function(req, res) {
    db.Type.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
};
