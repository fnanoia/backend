const express = require("express");
const passport = require("passport");
const UserModel = require("./models");

const appRoutes = express.Router();

//home
appRoutes.get("/", async (req, res) => {
  res.render("home");
});

//auth routes
appRoutes.get("/login", async (req, res) => {
  res.render("login");
});

appRoutes.get("/register", async (req, res) => {
  res.render("register");
});

//error route
appRoutes.get("/error", async (req, res) => {
  res.render("error");
});

//login
appRoutes.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login", session: false }),
  function (req, res) {
    res.render("home", { email: user.email });
  }
);

//register
appRoutes.post("/register", async (req, res) => {
  const { email, password } = req.body;

  //comprobar si el email ya se registro
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return res.render("error", { email: email });
  }

  //agregar input a la BBDD
  const newUser = { email, password };
  await UserModel.create(newUser);

  res.render("home", { email: email });
});

module.exports = appRoutes;
