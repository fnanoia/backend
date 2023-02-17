//const { userApi } = require("../dao/user.dao");
//usermodel

//find all users
const findAll = async (req, res) => {
  const users = await userApi.findAll();

  return users;
};
//find one user by id
const findOneById = async (req, res, id) => {
  const user = await userApi.findOneById(id);

  return user;
};

//find one user by email
const findOneByEmail = async (req, res, email) => {
  const user = await userApi.findOneByEmail(email);

  return user;
};

//create new user
const createUser = async (req, res, newUser) => {
  const user = await userApi.createUser(newUser);
  console.log(user)
  return user;
};

module.exports = { findAll, findOneById, findOneByEmail, createUser };
