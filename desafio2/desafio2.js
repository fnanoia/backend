const fs = require("fs");

class Container {
  constructor(fileDir) {
    this.fileDir = fileDir;
  }

  async save(object) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      //parseo json para trabajar con array
      const parsedData = JSON.parse(data);
      console.log(parsedData.products);

      //obtengo el id del ultimo elemento del array
      const dataIndex = parsedData.products.length;
      const newId = parsedData.products[dataIndex - 1].id;

      //agrego el nuevo objeto
      const newObject = { id: newId + 1, ...object };
      parsedData.products.push(newObject);
      console.log(parsedData);

      //sobreescribo archivo con nueva data que incluye al objeto
      await fs.promises.writeFile(
        this.fileDir,
        JSON.stringify(parsedData, null, 2)
      );
      console.log("data saved successfully");
    } catch (error) {
      console.error(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");

      const parseData = JSON.parse(data);
      const findData = parseData.products.find((x) => x.id === id);
      console.log(findData);
    } catch (error) {
      console.error(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parsedData = JSON.parse(data);
      console.log(parsedData.products);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(this.fileDir, "utf-8");
      const parseData = JSON.parse(data);
      //filtro los que NO tengan el id que busco y lo guardo en un nuevo array
      const newData = parseData.products.filter((x) => x.id !== id);

      //re escribo el archivo con el nuevo array
      await fs.promises.writeFile(
        this.fileDir,
        `{"products":  ${JSON.stringify(newData, null, 2)} }`
      );
      console.log(`id ${id} deleted successfully`);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileDir, `{"products": []}`);
      console.log("data deleted succesfully");
    } catch (error) {
      console.error(error);
    }
  }
}

const test = new Container("./desafio2/files.json")

  //.save({"name": "manjaro"})
  //.getById(1);
  .getAll();
//.deleteById(3)
//.deleteAll()
