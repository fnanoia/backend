const { userApi } = require("../dao/user.dao");
const { comparePassword } = require("../utils/jwt");

//Users
//get all users in bbdd
const getUsers = async (req, res) => {
  const users = await userApi.findAll();

  res.send({ users: users });
};

//get one user by Id
const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await userApi.findOneById(id);

  res.send({ user: user });
};

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
    return res.status(409).send(err);
  }
};

/*
const loginUser = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (!user) {
        return res.status(404).json(info);
      }

      req.login(user, { session: true }, async (err) => {
        if (err) return next(err);

        return res.send({
          message: "User succesffully auth",
          status: 200,
          user: user,
        });
      });
    } catch (error) {
      return next(err);
    }
  })(req, res, next);
};
*/

//register
const registerUser = async (req, res) => {
  const { email, password, name, age } = req.body;

  //comprobar si el email ya se registro
  const userExists = await userApi.findOneByEmail(email);
  if (userExists) {
    return res.render("error", { email: email });
  }

  //agregar input a la BBDD
  const newUser = { email, password, name, age };
  await userApi.createUser(newUser);

  res.render("home", { email: email });
};

module.exports = { getUsers, getUserById, loginUser, registerUser };
