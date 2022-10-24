const socket = io();

const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const url = document.getElementById("url");
const submit = document.getElementById("submit");
const render = document.getElementById("render");

const mail = document.getElementById("mail");
const msg = document.getElementById("msg");
const enviar = document.getElementById("enviar");

const newProductfromFront = {
  name: name.value,
  price: price.value,
  url: url.value,
};

//recibir data del servidor
socket.on("msgFromServer", (data) => {
  console.log(data);
});

//enviar data al servidor
submit.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("formData", newProductfromFront);
  form.reset();
});

//escuchar socket emitido desde el serv. recibe data para renderizar en tiempo real
socket.on("renderData", (productos) => {
  let table = `
  <table id="table">
  <tr>
    <th>Id</th>
    <th>Producto</th>
    <th>Precio</th>
    <th>Imagen</th>
  </tr>
  </table> 
  `;
  productos.forEach((producto) => {
    table =
      table +
      `
  <tr>
    <td>${producto.id}</td>
    <td>${producto.name}</td>
    <td>${producto.price}</td>
    <td><img src="${producto.url}" width="50px"/></td>
  </tr>
`;
  });

  render.innerHTML = table;
});


//chat
enviar.addEventListener("click", function () {
  socket.emit("chat", {
    msg: msg.value,
    mail: mail.value,
    date: new Date(),
  });
});

socket.on("chat", (data) => {
  chat.innerHTML += `
  <div>
  <p id="datamail">${data.mail}${data.date}:${data.msg}
  </p>
  </div>
  `;
});