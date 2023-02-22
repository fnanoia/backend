const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        user = await UserModel.findOneByEmail({ email: email });
        console.log(user);
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

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports =  passport ;
