const bcrypt = require("bcrypt");

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = {
  comparePassword,
};
