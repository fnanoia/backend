const express = require("express");
const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  registerUser,
  deleteAllUsers,
} = require("../controllers/user.controllers");

const userRoutes = express.Router();

//users
userRoutes.get("/user", getUsers).get("/user/:id", getUserById);

//update
userRoutes.put("/user/:id", updateUserById);

//delete
userRoutes.delete("/user/:id", deleteUserById).delete("/user", deleteAllUsers);

//login
userRoutes.post("/user/login", loginUser);

//register
userRoutes.post("/register", registerUser);

module.exports = userRoutes;
