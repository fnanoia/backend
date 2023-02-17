const express = require("express");
const {
  getHome,
  loginView,
  registerView,
  infoView,
  errorView,
} = require("../controllers/app.controllers");

const appRoutes = express.Router();

//Views: home, login, register, error, info
appRoutes
  .get("/", getHome)
  .get("/login", loginView)
  .get("/register", registerView)
  .get("/error", errorView)
  .get("/info", infoView);

module.exports = appRoutes;
