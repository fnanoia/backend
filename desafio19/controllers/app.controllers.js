const passport = require("passport");
const proc = require("../utils/info");
const { findAll, findOneById, findOneByEmail, createUser } = require("../services/app.services");

//Views
//home
const getHome = async (req, res) => {
    res.render("home");
}

//login
const loginView = async (req, res) => {
    res.render("login");
}

//register
const registerView = async (req, res) => {
    res.render("register");
}

//error 
const errorView = async (req, res) => {
    res.render("error");
}

//info
const infoView = async (req, res) => {
    res.render("info", { info: proc });
}

//Users
//get all users in bbdd
const getUsers = async (req, res) => {
    const users = await findAll();

    res.send({ users: users })
}

//get one user by Id
const getUserById = async (req, res) => {
    const { id } = req.params;

    const user = await findOneById(id);

    res.send({ user: user })
}

//login
const loginUser = async (req, res) => {
    passport.authenticate("login", { failureRedirect: "/login", session: false }),
        function (req, res) {
            res.render("home", { email: user.email });
        }
}

//register
const registerUser = async (req, res) => {
    const { email, password } = req.body;

    //comprobar si el email ya se registro
    const userExists = await findOneByEmail(email);
    if (userExists) {
        return res.render("error", { email: email });
    }

    //agregar input a la BBDD
    const newUser = { email, password };
    await createUser(newUser);

    res.render("home", { email: email });
}

module.exports = {
    getHome, loginView, registerView, infoView, errorView, getUsers, getUserById, loginUser, registerUser
}
