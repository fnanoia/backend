const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product-routes");

//basic config
dotenv.config();

//init app
const app = express();

//define port
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use("/api", productRoutes);

//testing home
app.get("/", (req, res) => {
  res.json("Hello server");
});

//init server w/listener
const boot = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

boot();
