/*
const socket = io();

//dom elements
//prod
const form = document.getElementById("form");
const name = document.getElementById("name");
const price = document.getElementById("price");
const url = document.getElementById("url");
const render = document.getElementById("render");

//chat
const msg = document.getElementById("msg");
const enviar = document.getElementById("enviar");

let user;

Swal.fire({
  title: "Formulario perfil",
  html: `<input type="text" id="email" class="swal2-input" placeholder="Correo">
  <input type="text" id="name" class="swal2-input" placeholder="Nombre">
  <input type="text" id="lastname" class="swal2-input" placeholder="Apellido">`,
  confirmButtonText: "Iniciar",
  focusConfirm: false,
  preConfirm: () => {
    const email = Swal.getPopup().querySelector("#email").value;
    const name = Swal.getPopup().querySelector("#name").value;
    const lastname = Swal.getPopup().querySelector("#lastname").value;
    if (!email || !name || !lastname) {
      Swal.showValidationMessage(`complete el formulario`);
    }
    return { email, name, lastname };
  },
  allowOutsideClick: false,
}).then((result) => {
  Swal.fire(
    `
    Email: ${result.value.email}
    Nombre: ${result.value.name}
    Apellido: ${result.value.lastname}
  `.trim()
  );
  user = result.value;
});

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

//normalizr schemas
const authorSchema = new normalizr.schema.Entity(
  "authors",
  {},
  { idAttribute: "email" }
  );
  const messageSchema = new normalizr.schema.Entity("message", { author: authorSchema });
  const chatSchema = new normalizr.schema.Entity(
    "chat",
    { messages: [messageSchema] },
    { idAttribute: "id" }
    );
    
    //chat
    socket.on("msg", async (data) => {
      
      const normalData = normalizr.denormalize(
        data.result,
        chatSchema,
        data.entities
        );
        
        let msgElements = "";
        normalData.messages.forEach((msg) => {
          msgElements += `
          <div>
          <p>
          <span id="data__mail">${msg.author.name}</span>[
            <span id="data__date">${msg.timestamp}</span>]:
            <span id="data__msg">${msg.message}</span>
            </p>
            </div>
            `;
          });
          chat.innerHTML = normalData.messages.length > 0 ? msgElements : "";
          
        });
        
        //enviar msj
        enviar.addEventListener("click", () => {
          socket.emit("newMsg", {
            author: user,
            timestamp: new Date().toLocaleString().replace("AM", "").replace("PM", ""),
            message: msg.value,
          });
          msg.value = "";
        });
*/