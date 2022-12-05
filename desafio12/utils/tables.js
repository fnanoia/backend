const options = require("../config/db-config");
const knex = require("knex");

//crear tabla en db mysql
const mysql = knex(options.mariaDB);
const sqlite = knex(options.sqliteDB);

const createTables = async () => {
  try {
    const verifyTable = await mysql.schema.hasTable("productos");
    if (verifyTable) {
      await mysql.schema.dropTable("productos");
    }
    await mysql.schema.createTable("productos", (table) => {
      table.increments("id");
      table.string("name", 40).nullable(false);
      table.integer("price");
      table.string("url", 100);
    });
    console.log("table productos created successfully");
    mysql.destroy();

    const verifyChat = await sqlite.schema.hasTable("chat");
    if (verifyChat) {
      await sqlite.schema.dropTable("chat");
    }
    await sqlite.schema.createTable("chat", (table) => {
      table.increments("id");
      table.string("user", 20);
      table.string("timestamp");
      table.string("message", 100);
    });
    console.log("table chat created successfully");
    sqlite.destroy();

  } catch (error) {
    console.log(error);
  }
};

createTables();
