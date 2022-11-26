const express = require("express");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const { schema, normalize } = require("normalizr");

const productRoutes = require("./routes/routes");

//contenedores y db config
const MySqlContainer = require("./utils/mysql-container");
const chatContainer = require("./utils/chat-container");
const options = require("./config/db-config");

//instancia de clases
const productServices = new MySqlContainer(options.mariaDB, "productos");
const chatServices = new chatContainer("./desafio9/files/chat.txt");

//schemas
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity("message", { author: authorSchema });
const chatSchema = new schema.Entity(
  "chat",
  { messages: [messageSchema] },
  { idAttribute: "id" }
);

//normalizacion de datos
const normalizeData = (data) => {
  const normalized_Data = normalize(
    { id: "chat_id", messages: data },
    chatSchema
  );
  return normalized_Data;
};

const normalizeMessages = async () => {
  const msgs = await chatServices.getAll();

  const normalized_Messages = normalizeData(msgs);
  return normalized_Messages;
};

//init app. define port
const app = express();
const port = 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use static
app.use(express.static("public"));

//set engine and configs
app.engine("hbs", engine({ extname: ".hbs" }));
app.set("views", "./desafio9/views");
app.set("view engine", "hbs");

//basic routes
app.get("/", async (req, res) => {
  const productos = await productServices.getAll();
  res.render("home", { products: productos });
});

app.get("/productos", async (req, res) => {
  const productos = await productServices.getAll();
  res.render("products", { products: productos });
});

//api routes
app.use("/api", productRoutes);

//init server w/listener
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

//websocket
const io = new Server(server);

//open connections
io.on("connection", async (socket) => {
  console.log(`socket ${socket.id} connected on ${port}`);

  //productos
  //enviar todos los prod al front para renderizar
  io.sockets.emit("renderData", await productServices.getAll());

  //recibir data del frontend
  socket.on("formData", async (data) => {
    //guardar la data en la bbdd
    await productServices.save(data);
    //enviar todos los prod al front para renderizar
    io.sockets.emit("renderData", await productServices.getAll());
  });

  //chat
  //enviar todos los mensajes al socket que se conecta
  io.sockets.emit("msg", await normalizeMessages());

  socket.on("newMsg", async (data) => {
    await chatServices.save(data);

    io.sockets.emit("msg", await normalizeMessages());
  });
});
