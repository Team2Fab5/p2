$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and user select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var disForm = $("#dis");
    var userSelect = $("#user");
    // Adding an event listener for when the form is submitted
    $(disForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a task)
    var url = window.location.search;
    var typeId;
    var UserId;
    // Sets a flag for whether or not we're updating a task to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the task id from the url
    // In '?task_id=1', taskId is 1
    if (url.indexOf("?task_id=") !== -1) {
      typeId = url.split("=")[1];
      getTaskData(typeId, "type");
    }
    // Otherwise if we have an user_id in our url, preset the user select box to be our user
    else if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
    }
  
    // Getting the users, and their tasks
    getUsers();
  
    // A function for handling what happens when the form to create a new task is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the task if we are missing a body, title, or author
      if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
        return;
      }
      // Constructing a newType object to hand to the database
      var newType = {
        title: titleInput
          .val()
          .trim(),
        body: bodyInput
          .val()
          .trim(),
        UserId: userSelect.val()
      };
  
      // If we're updating a task run updateType to update a task
      // Otherwise run submitType to create a whole new task
      if (updating) {
        newType.id = typeId;
        updateType(newType);
      }
      else {
        submitType(newType);
      }
    }
  
    // Submits a new task and brings user to task page upon completion
    function submitType(type) {
      $.post("/api/tasks", type, function() {
        window.location.href = "/task";
      });
    }
  
    // Gets post data for the current task if we're editing, or if we're adding to an user's existing tasks
    function getTaskData(id, type) {
      var queryUrl;
      switch (type) {
      case "type":
        queryUrl = "/api/tasks/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.UserId || data.id);
          // If this task exists, prefill our dis forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          UserId = data.UserId || data.id;
          // If we have a task with this id, set a flag for us to know to update the task
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Users and then render our list of Users
    function getUsers() {
      $.get("/api/users", renderUserList);
    }
    // Function to either render a list of users, or if there are none, direct the user to the page
    // to create an author first
    function renderUserList(data) {
      if (!data.length) {
        window.location.href = "/users";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      userSelect.empty();
      console.log(rowsToAdd);
      console.log(userSelect);
      userSelect.append(rowsToAdd);
      userSelect.val(UserId);
    }
  
    // Creates the user options in the dropdown
    function createUserRow(user) {
      var listOption = $("<option>");
      listOption.attr("value", user.id);
      listOption.text(user.username);
      return listOption;
    }
  
    // Update a given task, bring user to the task page when done
    function updateType(type) {
      $.ajax({
        method: "PUT",
        url: "/api/tasks",
        data: type
      })
        .then(function() {
          window.location.href = "/task";
        });
    }
  });