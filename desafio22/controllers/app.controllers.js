const proc = require("../utils/info");

//Views
//home
const getHome = async (req, res, next) => {
  res.render("home");
};

//login
const loginView = async (req, res) => {
  res.render("login");
};

//register
const registerView = async (req, res) => {
  res.render("register");
};

//error
const errorView = async (req, res) => {
  res.render("error");
};

//info
const infoView = async (req, res) => {
  res.render("info", { info: proc });
};

module.exports = {
  getHome,
  loginView,
  registerView,
  infoView,
  errorView,
};
