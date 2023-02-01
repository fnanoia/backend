const express = require("express");
const { getHome, loginView, registerView, infoView, errorView, getUsers, loginUser, registerUser, getUserById } = require("../controllers/app.controllers");

const appRoutes = express.Router();

//Views: home, login, register, error, info
appRoutes.get("/", getHome).get("/login", loginView).get("/register", registerView).get("/error", errorView).get("/info", infoView);

//users
appRoutes.get("/user", getUsers).get("/user/:id", getUserById);

//login
appRoutes.post("/login", loginUser);

//register
appRoutes.post("/register", registerUser);


module.exports = appRoutes;
