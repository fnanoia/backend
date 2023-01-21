const express = require("express");
const logger = require("./logger");

const randomRoutes = express.Router();


//calculate number
randomRoutes.get("/api/randoms", async (req, res) => {
  logger.info({ msg: "express server on Nginx", PID: process.pid, date: new Date().toLocaleString() });
  res.json({ msg: "child process off", query: req.query })

});

module.exports = randomRoutes;
