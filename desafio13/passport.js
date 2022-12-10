const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserModel = require("./models");

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        user = await UserModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user, { message: "Login successfull" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
/*
const loginController = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) {
        //return res.status(404).json(info);
        return  res.redirect("/error")
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
      });

      res.redirect("/")
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

module.exports = loginController;
*/