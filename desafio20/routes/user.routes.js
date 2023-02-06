const express = require("express");
const {
  getUsers, getUserById, loginUser, registerUser 
} = require("../controllers/user.controllers");

const userRoutes = express.Router();

//users
userRoutes.get("/user", getUsers).get("/user/:id", getUserById);

//login
userRoutes.post("/user/login", loginUser);

//register
userRoutes.post("/register", registerUser);

module.exports = userRoutes;
