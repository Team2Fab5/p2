const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.uuid);
  });

  passport.deserializeUser((uuid, done) => {
    db.Accounts.findById(uuid).then(user => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "account_key",
      passReqToCallback: true
    },
    (req, email, account_key, done) => {
      process.nextTick(() => {
        db.Accounts.findOne({
          where: {
            email
          }
        }).then((user, err) => {
          if (err) {
            console.log("err", err);
            return done(err);
          }
          if (user) {
            console.log("signupMessage", "That email is already taken.");
            return done(
              null,
              false,
              req.flash("signupMessage", "That email is already taken.")
            );
          } else {
            db.user
              .create({
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                account_key: db.Accounts.generateHash(account_key)
              })
              .then(dbUser => {
                return done(null, dbUser);
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      });
    }
  )
);
