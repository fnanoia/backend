const { Router } = require("express");
const { saveProduct, getAll } = require("../utils/container-methods");

const productRoutes = Router();

//home
productRoutes.get("/", async (req, res) => {
  const productos = await getAll();
  try {
    res.render("home", { products: productos });
  } catch (error) {
    res.send(error);
  }
});

productRoutes.get("/productos", async (req, res) => {
  const productos = await getAll();
  res.render("products", { products: productos });
});

productRoutes.post("/productos", async (req, res) => {
  
  try {
    const { name, price, url } = req.body;

    const newProduct = {
      name: name,
      price: price,
      url: url,
    };

    saveProduct(newProduct);
    
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

module.exports = productRoutes;
