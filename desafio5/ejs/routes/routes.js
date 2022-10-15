const { Router } = require("express");
const { saveProduct, getAll } = require("../utils/container-methods");

const productRoutes = Router();

//home
productRoutes.get("/", async (req, res) => {
  try {
    res.render("pages/index",{message: "EJS template"});
  } catch (error) {
    res.send(error);
  }
});

productRoutes.get("/productos", async (req, res) => {
  const productos = await getAll();
  res.render("pages/products", { products: productos });
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
    console.log(newProduct);

    return res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

module.exports = productRoutes;
