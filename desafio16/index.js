//express
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
//mongo
const mongoose = require("mongoose");
//cookies
const cookieParser = require("cookie-parser");
//passport
const passport = require("passport");
//routes
const appRoutes = require("./routes");
const randomRoutes = require("./random.routes");
//ENV config
const dotenv = require("dotenv");
dotenv.config();
//compression
const compression = require("compression");
//logger
const logger = require("./logger");
const { default: pino, destination } = require("pino");
const loggerHttp = require('pino-http')({
  logger: pino(destination("./logs/info.log")
  ),
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  },
  wrapSerializers: true,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },
});

//init app. define port
const app = express();
const port = parseInt(process.argv[2]) || 8080;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(loggerHttp);

//sessions
app.use(
  session({
    secret: process.env.DB_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

//passport
require("./passport.js");
app.use(passport.initialize());
app.use(passport.session());

//use static
app.use(express.static("public"));

//set engine and configs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("views", "./desafio16/views");
app.set("view engine", "hbs");

//routes
app.use("/", appRoutes);
app.use("/", randomRoutes);

const boot = async () => {
  await mongoose.connect(process.env.DB_URI, { dbName: "coder-sessions" });

  app.listen(port, () => {
    logger.info(`Running on http://localhost:${port}`);
    logger.info(`DB connected succesfully`);
  });
};

boot();
