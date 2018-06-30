var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to login with a username/email and password
passport.use(
  new LocalStrategy(
    // User will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      db.Dog.findOne({
        where: {
          email: email
        }
      })
        .then(function(dbUser) {
          // If there's no user with the given email
          if (!dbUser) {
            return done(null, false, {
              message: "Incorrect email."
            });
          }
          // If there is a user with the given email, but the password the user gives us is incorrect
          else if (dbUser.password !== password) {
            return done(null, false, {
              message: "Incorrect password."
            });
          }
          // If none of the above, return the user
          return done(null, dbUser);
        })
        .catch(error => {
          console.log(error);
        });
    }
  )
);

// In order to help keep authentication state across HTTP requests,

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
