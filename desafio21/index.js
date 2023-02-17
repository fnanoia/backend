//express
const express = require("express");
const { engine } = require("express-handlebars");
const session = require("express-session");
//cookies
const cookieParser = require("cookie-parser");
//config
const { options } = require("./config/config");
//cors
const cors = require("cors");
//db
require("./db/mongo/MongoClient");
//compression
const compression = require("compression");
//logger
const logger = require("./utils/logger");
const { default: pino, destination } = require("pino");
const loggerHttp = require("pino-http")({
  logger: pino(destination("../logs/info.log")),
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  wrapSerializers: true,
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
});

//init app. define port
const app = express();
const port = parseInt(process.argv[2]) || options.server.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser(options.mongoDB.DB_SECRET));
app.use(compression());
app.use(loggerHttp);

//sessions
app.use(
  session({
    secret: options.mongoDB.DB_SECRET,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);

//use static
app.use(express.static("public"));

//set engine and configs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("views", "./views");
app.set("view engine", "hbs");

//routes
const appRoutes = require("./routes/app.routes");
app.use("/", appRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const randomRoutes = require("./routes/random.routes");
app.use("/", randomRoutes);

app.listen(port, () => {
  logger.info(`Running on http://localhost:${port}`);
});

module.exports =  app ;
