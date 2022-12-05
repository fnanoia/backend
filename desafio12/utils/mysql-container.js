const knex = require("knex");

class MySqlContainer {
  constructor(options, tableName) {
    this.database = knex(options);
    this.tableName = tableName;
  }

  async getAll() {
    try {
      const data = await this.database.from(this.tableName).select("*");
      const results = data.map(element => ({...element}));
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
        const [Id] = await this.database.from(this.tableName).insert(object);
        return `new data ${Id} saved successfully`
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MySqlContainer;
