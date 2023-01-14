const express = require("express");
const { fork } = require("child_process");
const logger = require("./logger");

const randomRoutes = express.Router();


//calculate number
randomRoutes.get("/api/randoms", async (req, res) => {
  logger.info({msg: "express server on Nginx", PID: process.pid, date: new Date().toLocaleString()});
  res.json({msg: "child process off", query: req.query})
  /*
  const child = fork("desafio16/child.js");

  //recibir msj del proceso hijo
  child.on("message", (childMsg) => {
    if (childMsg === "OK") {
      //recibimos notificacion del proceso hijo
      //enviamos informacion
      child.send(req.query);
      
    } else {
     // mostramos el resultado del proceso hijo
     res.render("random", { childMsg });
    }
  });
  */
});

module.exports = randomRoutes;
