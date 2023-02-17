const { MongoContainer } = require("../db/mongo/MongoContainer");
const { UserDto } = require("../dto/user.dto");
const UserModel = require("../db/models");
const { comparePassword } = require("../utils/jwt");

////
//Implementacion del patron DAO, se instancia la clase base en el constructor
//Esta clase no interactua con la BBDD
class UserDao extends MongoContainer {
  constructor(model) {
    super(model);
  }

  async findAll() {
    const users = await super.findAll();

    //Filtro response del backend mediante DTO hacia las vistas del cliente
    const usersDto = users.map((user) => {
      const userDto = new UserDto(user);
      return userDto;
    });
    return usersDto;
  }

  async findOneById(id) {
    const user = await super.findOneById(id);

    //Filtro response del backend mediante DTO hacia las vistas del cliente
    const userDto = new UserDto(user);
    return userDto;
  }

  async findOneByEmail(email) {
    const user = await super.findOneByEmail(email);
    return user;
  }

  async createUser(newUser) {
    const user = await super.createUser(newUser);
    return user;
  }

  async updateUser(id, updatedUser) {
    const user = await super.updateUser(id, updatedUser);
    return user;
  }

  async deleteUser(id) {
    const user = await super.deleteUser(id);
    return user;
  }

  async deleteAll() {
    const user = await super.deleteAll();
    return user;
  }
}

//Instancio y exporto la clase que va a ser llamada en los controladores. Le paso el modelo de la entidad por el contructor.
const userApi = new UserDao(UserModel);

module.exports = { userApi };
