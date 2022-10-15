const express = require("express");

const { engine } = require("express-handlebars");
const productRoutes = require("./routes/routes");

//init app. define port
const app = express();
const port = 3000;

//set engine and configs
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./desafio5/hbs/views");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", productRoutes);

//use static
app.use(express.static("public"));

//init server w/listener
const boot = () => {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
};

boot();
