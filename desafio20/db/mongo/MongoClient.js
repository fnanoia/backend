const mongoose = require("mongoose");
const logger = require("../../utils/logger");
const dotenv = require("dotenv");
dotenv.config();

//Clase base para conexiones a BBDD: MongoDB
class MyMongoClient {
  constructor() {
    this.client = mongoose;
  }

  async connect() {
    try {
      this.client.set("strictQuery", false);
      await this.client.connect(process.env.DB_URI, {
        dbName: "coder-sessions",
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
