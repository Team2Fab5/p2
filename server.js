require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");

//added for passport
// const passport = require("passport");
// const bodyParser = require("body-parser");
// const flash = require("connect-flash");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;
require("./config/passport")(passport);
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//added for passport
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//added for passport
// app.use(
//   session({
//     key: "user_sid",
//     secret: "goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 600000
//     }
//   })
// );
//more passport
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// Routes -- added passport routes
require("./routes/html-routes")(app);
// require("./routes/account-controller")(app, passport);
// require("./routes/item-controller")(app, passport);
// require("./routes/search-controller")(app, passport);
// require("./routes/transactions-controller")(app, passport);
require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
