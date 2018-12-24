const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.uuid);
  });

  passport.deserializeUser(function(uuid, done) {
    db.Accounts.findById(uuid).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
