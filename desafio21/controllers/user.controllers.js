const { userApi } = require("../dao/user.dao");
const { comparePassword } = require("../utils/jwt");

//Users
//get all users in bbdd
const getUsers = async (req, res) => {
  try {
    const users = await userApi.findAll();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).json("Error reading users from db " + "\n" + err);
  }
};

//get one user by Id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userApi.findOneById(id);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).json("User does not exist" + "\n" + err);
  }
};

//update user by id
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userApi.findOneById(id);
    if (!user) return res.status(404).json("User not found");

    const { email, password, name, age } = req.body;
    const updatedUser = {
      email: email ? email : user.email,
      password: password ? password : user.password,
      name: name ? name : user.name,
      age: age ? age : user.age,
    };

    const newUser = await userApi.updateUser(id, updatedUser);
    return res
      .status(200)
      .json({ data: newUser, message: "user updated successfully" });
  } catch (err) {
    return res.status(400).json("Error updating " + "\n" + err);
  }
};

//delete user by Id
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    await userApi.deleteUser(id);

    return res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    return res.status(400).json("Error deleting user " + "\n" + err);
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await userApi.deleteAll();
    return res
      .status(200)
      .json({ message: "all users deleted succesfully. empty db" });
  } catch (err) {
    return res.status(400).json("Error deleting users " + "\n" + err);
  }
};

//Auth
//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //el DAO busca user por id
    const user = await userApi.findOneByEmail(email);
    if (!user) return false;

    //si existe, compruebo pwd
    const validate = await comparePassword(password, user.password);

    if (!validate) {
      return res.status(401).send("Wrong email or password");
    }

    //si coincide, log in
    return res.render("home", { email: email });
  } catch (err) {
    return res.status(400).json("Error at login" + "\n" + err);
  }
};

//register
const registerUser = async (req, res) => {
  try {
    const { email, password, name, age } = req.body;

    //comprobar si el email ya se registro
    const userExists = await userApi.findOneByEmail(email);
    if (userExists) {
      return res.render("error", { email: email });
    }

    //agregar input a la BBDD
    const newUser = { email, password, name, age };
    const user = await userApi.createUser(newUser);
    console.log("user created succesfully")

    return res
      .status(200)
      .json({ data: user })
  } catch (err) {
    return res.status(400).json("Error at register" + "\n" + err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  deleteAllUsers,
  loginUser,
  registerUser,
};
