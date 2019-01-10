$(document).ready(function() {
  /* global moment */
  // taskContainer holds all of our tasks
  var taskContainer = $(".task-container");
  var taskCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleTaskDelete);
  $(document).on("click", "button.edit", handleTaskEdit);
  // Variable to hold our tasks
  var types;

  // The code below handles the case where we want to get display of tasks for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getTasks(userId);
  }
  // If there's no userId we just get all tasks as usual
  else {
    getTasks();
  }


  // This function grabs tasks from the database and updates the view
  function getTasks(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/tasks" + userId, function(data) {
      console.log("Tasks", data);
      types = data;
      if (!types || !types.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete tasks
  function deleteTask(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/tasks/" + id
    })
      .then(function() {
        getTasks(taskCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed task HTML inside taskContainer
  function initializeRows() {
    taskContainer.empty();
    var tasksToAdd = [];
    for (var i = 0; i < types.length; i++) {
      tasksToAdd.push(createNewRow(types[i]));
    }
    taskContainer.append(tasksToAdd);
  }

  // This function constructs a task's HTML
  function createNewRow(type) {
    var formattedDate = new Date(type.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newTaskCard = $("<div>");
    newTaskCard.addClass("card");
    var newTaskCardHeading = $("<div>");
    newTaskCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("completed");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newTaskTitle = $("<h2>");
    var newTaskDate = $("<small>");
    var newTaskUser = $("<h5>");
    newTaskUser.text("Written by: " + type.User.name);
    newTaskUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-30px"
    });
    var newTaskCardBody = $("<div>");
    newTaskCardBody.addClass("card-body");
    var newTaskBody = $("<p>");
    newTaskTitle.text(type.title + " ");
    newTaskBody.text(type.body);
    newTaskDate.text(formattedDate);
    newTaskTitle.append(newTaskDate);
    newTaskCardHeading.append(deleteBtn);
    newTaskCardHeading.append(editBtn);
    newTaskCardHeading.append(newTaskTitle);
    newTaskCardHeading.append(newTaskUser);
    newTaskCardBody.append(newTaskBody);
    newTaskCard.append(newTaskCardHeading);
    newTaskCard.append(newTaskCardBody);
    newTaskCard.data("task", type);
    return newTaskCard;
  }

  // This function figures out which post we want to delete and then calls deleteTask
  function handleTaskDelete() {
    var currentTask = $(this)
      .parent()
      .parent()
      .data("task");
    deleteTask(currentTask.id);
  }

  // This function figures out which task we want to edit and takes it to the appropriate url
  function handleTaskEdit() {
    var currentTask = $(this)
      .parent()
      .parent()
      .data("task");
    window.location.href = "/dis?type_id=" + currentTask.id;
  }

  // This function displays a message when there are no tasks
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    taskContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/dis" + query +
    "'>here</a> in order to get started.");
    taskContainer.append(messageH2);
  }

});