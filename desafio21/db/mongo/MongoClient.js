const mongoose = require("mongoose");
const logger = require("../../utils/logger");
const { options } = require("../../config/config");

//Clase base para conexiones a BBDD: MongoDB
class MyMongoClient {
  constructor() {
    this.client = mongoose;
  }

  async connect() {
    try {
      this.client.set("strictQuery", false);
      await this.client.connect(options.mongoDB.DB_URI, {
        dbName:
          options.server.NODE_ENV === "TEST"
            ? options.mongoDB.DB_TEST
            : options.mongoDB.DB_DEV,
      });
      logger.info("db connected successfully");
    } catch (error) {
      logger.error("error connecting to db");
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      logger.info("db disconnected successfully");
    } catch (error) {
      logger.error("error disconnecting to db");
    }
  }
}

module.exports = { db_mongo: new MyMongoClient().connect() };
