const Container = require("../../../desafio2/desafio2");

const getAll = async (req, res) => {
  try {
    const data = await new Container("./desafio4/products.json").getAll();
    return res.send(data);
  } catch (error) {
    return res.status(400).send({ error: "no se encontraron productos" });
  }
};

const getById = async (req, res) => {
  try {
    const id = JSON.parse(req.params.id);

    const data = await new Container("./desafio4/products.json").getById(id);

    if (!data) return res.status(400).send({ error: "ese producto no existe" });

    return res.send(data);
  } catch (error) {
    return res.status(400);
  }
};

const save = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price)
      return res.status(400).send({ error: "campos incompletos" });

    const newProduct = {
      name: name,
      price: price,
    };

    await new Container("./desafio4/products.json").save(newProduct);
    return res.status(200).send("producto agregado");
  } catch (error) {
    return res.status(400).send({ error: "producto no guardado" });
  }
};

const updateById = async (req, res) => {
  try {
    const id = JSON.parse(req.params.id);
    const { name, price } = req.body;

    //validar si existe el id
    const data = await new Container("./desafio4/products.json").getById(id);
    if (!data) return res.status(400).send("producto no existente");

    //editar el objeto con los datos del body
    const newData = {
      name: name,
      price: price,
    };

    //actualizar
    await new Container("./desafio4/products.json").updateById(id, newData);

    return res.status(200).send("producto actualizado");
  } catch (error) {
    return res.status(400);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = JSON.parse(req.params.id);

    await new Container("./desafio4/products.json").deleteById(id);
    res.status(200).send("producto eliminado");
  } catch (error) {
    return res.status(400);
  }
};

module.exports = { getAll, getById, save, updateById, deleteById };
