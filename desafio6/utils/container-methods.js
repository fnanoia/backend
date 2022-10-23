const Container = require("../../desafio2/desafio2");

const saveProduct = (product) => {
  new Container("./desafio6/products.json").save(product);
};

const getAll = () => {
  const productos = new Container("./desafio6/products.json").getAll();
  return productos
};

module.exports = { saveProduct, getAll };
