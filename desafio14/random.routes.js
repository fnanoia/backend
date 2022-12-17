const express = require("express");
const { fork } = require("child_process");

const randomRoutes = express.Router();

//calculate number
randomRoutes.get("/api/randoms", async (req, res) => {

  const child = fork("desafio14/child.js");

  //recibir msj del proceso hijo
  child.on("message", (childMsg) => {
    if (childMsg === "OK") {
      //recibimos notificacion del proceso hijo
      //enviamos informacion
      child.send(req.query);
      
    } else {
      console.log(childMsg)
     // mostramos el resultado del proceso hijo
     res.render("random", { childMsg });
    }
  });
});

module.exports = randomRoutes;
