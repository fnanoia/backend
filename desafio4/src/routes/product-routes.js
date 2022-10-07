const { Router } = require("express");
const controllers = require("../controllers/product-controllers");

const productRoutes = Router();

//get all products
productRoutes.get("/productos", controllers.getAll);

//get product by id
productRoutes.get("/productos/:id", controllers.getById);

//add new product
productRoutes.post("/productos", controllers.save);

//update product by id
productRoutes.put("/productos/:id", controllers.updateById);

//delete product by id
productRoutes.delete("/productos/:id", controllers.deleteById);

module.exports = productRoutes;
