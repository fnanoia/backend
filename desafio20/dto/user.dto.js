//Complemento del patron DAO, creo un DTO para mostrar solamente email y password
//Esta clase se instancia junto con la implementacion del patron DAO
class UserDto {
  constructor(datos) {
    this.email = datos.email;
    this.name = datos.name;
    this.age = datos.age;
  }
}

module.exports = { UserDto };
