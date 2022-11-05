const socket = io();

//dom elements
//prod
const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const url = document.getElementById("url");
const render = document.getElementById("render");

//chat
const mail = document.getElementById("mail");
const msg = document.getElementById("msg");
const enviar = document.getElementById("enviar");

//enviar formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("formData", {
    name: name.value,
    price: price.value,
    url: url.value,
  });
  form.reset();
});

//enviar data al servidor
//fetch de productos
const fetchTable = async (data) => {
  const response = await fetch("./templates/table.hbs");
  const result = await response.text();
  const template = Handlebars.compile(result);
  const html = template({ products: data });
  return html;
};
//escuchar socket emitido desde el serv. recibe data para renderizar en tiempo real
socket.on("renderData", async (data) => {
  let table = await fetchTable(data);
  render.innerHTML = table;
});

//chat
socket.on("msg", async (data) => {
  let msgElements = "";
  data.forEach((msg) => {
    msgElements += `
    <div>
    <p>
    <span id="data__mail">${msg.user}</span>[
      <span id="data__date">${msg.timestamp}</span>]:
      <span id="data__msg">${msg.message}</span>
      </p>
      </div>
      `;
  });
  chat.innerHTML = data.length > 0 ? msgElements : "";
});

//enviar msj
enviar.addEventListener("click", () => {
  socket.emit("newMsg", {
    user: mail.value,
    timestamp: new Date().toLocaleString().replace("AM", "").replace("PM", ""),
    message: msg.value,
  });
  msg.value = "";
});
