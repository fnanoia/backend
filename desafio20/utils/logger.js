//logger
const pino = require("pino");
//env
const dotenv = require("dotenv");
dotenv.config();

let logger = null;

if (process.env.NODE_ENV === "prod") {
  const prodLogger = pino();
  prodLogger.level = "warn";
  logger = prodLogger;
} else {
  const devLogger = pino();
  devLogger.level = "info";
  logger = devLogger;
}

module.exports = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});
