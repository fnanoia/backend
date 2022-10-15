const Container = require("../../../desafio2/desafio2");

const saveProduct = (product) => {
  new Container("./desafio5/products.json").save(product);
};

const getAll = () => {
  const productos = new Container("./desafio5/products.json").getAll();
  return productos
};

module.exports = { saveProduct, getAll };
