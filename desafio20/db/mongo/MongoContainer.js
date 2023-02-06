//Factory
//Contenedor Mongo. Operaciones CRUD. Unica clase que interactua con la BBDD. Se pasa modelo segun entidad.

class MongoContainer {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    const users = await this.model.find();
    return users;
  }

  async findOneById(id) {
    const user = await this.model.findOne({ _id: id });
    return user;
  }

  async findOneByEmail(email) {
    const user = await this.model.findOne({ email: email });
    return user;
  }

  async createUser(newUser) {
    const user = await this.model.create(newUser);
    return user;
  }
}

module.exports = { MongoContainer };
