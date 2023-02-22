//ENV config
const dotenv = require("dotenv");
dotenv.config();
const ParsedArgs = require("minimist");

const objArgs = ParsedArgs(process.argv.slice(2), {
  alias: {
    p: "port",
    e: "env",
  },
  default: {
    port: 3030,
    env: "TEST",
  },
});

const options = {
  server: {
    PORT: objArgs.port,
    NODE_ENV: objArgs.env,
  },
  mongoDB: {
    DB_URI: process.env.DB_URI,
    DB_SECRET: process.env.DB_SECRET,
    DB_DEV: process.env.DB_DEV,
    DB_TEST: process.env.DB_TEST,
  },
};

console.log(options.server.NODE_ENV);
module.exports = { options };
