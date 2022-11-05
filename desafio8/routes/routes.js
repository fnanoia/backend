const { Router } = require("express");
const options = require("../config/db-config");
const MySqlContainer = require("../utils/mysql-container");

const productRoutes = Router();

const productServices = new MySqlContainer(options.mariaDB, "productos");

//home
productRoutes.get("/", async (req, res) => {
  try {
    const productos = await productServices.getAll();
    res.send(productos);
  } catch (error) {
    console.log(error);
  }
});

productRoutes.post("/", async (req, res) => {
  try {
    const { name, price, url } = req.body;

    const newProduct = {
      name: name,
      price: price,
      url: url,
    };

    const saveProduct = await productServices.save(newProduct);
    res.send(saveProduct);
  } catch (error) {
    console.log(error);
  }
});

module.exports = productRoutes;
