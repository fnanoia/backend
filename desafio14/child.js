process.send("OK"); //proceso hijo listo para trabajar

//algoritmo
function random(counter) {
  const array = [];
  //const arrayCheckNumber = [];

  //genero cant de numeros random y los agrego a un array
  for (let i = 0; i < counter; i++) {
    array.push(Math.floor(Math.random() * 1000) + 1);
  }

  //revisar cuantas veces existe el numero en el array generado
  //creo un objeto vacio, para almacenar la informacion
  let checkNumbers = {};

  //loop iterar el array
  array.forEach((x) => (checkNumbers[x] = (checkNumbers[x] || 0) + 1));
 // console.log(checkNumbers);


  return checkNumbers;
}

////recibimos los mensajes del proceso padre.
process.on("message", (parentMsg) => {
  const randomCounter = random(parentMsg.cant);
  //enviar resultado de la funcion al proceso padre
  process.send(randomCounter);
});
