const socket = io();

const table = document.getElementById("table");
const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const url = document.getElementById("url");
const submit = document.getElementById("submit");

//recibir data del servidor
socket.on("msgFromServer", function (data) {
  console.log(data);
});

//enviar data al servidor
submit.addEventListener("click", (e) => {
   e.preventDefault();
  
  socket.emit("form", {
    name: name.value,
    price: price.value,
    url: url.value,
  });
  
  form.reset();
});

//escuchar socket emitido desde el serv
socket.on("form", function (data) {
  console.log(data)
});

