const express = require("express");
const productRoutes = require("./routes/routes");

//init app. define port
const app = express();
const port = 4000;

//set engine and configs
app.set("views", "./desafio5/pug/views");
app.set("view engine", "pug");

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
