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

  async updateUser(id, updatedUser) {
    const user = await this.model.findOneAndUpdate({ _id: id }, updatedUser, {
      new: true,
    });
    return user;
  }

  async deleteUser(id) {
    const user = await this.model.findOneAndDelete({ _id: id }, { new: true });
    return user;
  }

  async deleteAll() {
    const user = await this.model.deleteMany();
    return user;
  }
}

module.exports = { MongoContainer };
