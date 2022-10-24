const express = require("express");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const productRoutes = require("./routes/routes");
const { saveProduct, getAll } = require("./utils/container-methods");

//init app. define port
const app = express();
const port = 3000;

//set engine and configs
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./desafio6/views");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", productRoutes);

//use static
app.use(express.static("public"));

//init server w/listener
const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

//websocket
const io = new Server(server);

//open connections
io.on("connection", async (socket) => {
  console.log(`socket ${socket.id} connected on ${port}`);

  //enviar data del server al frontend
  socket.emit("msgFromServer", "connected successfully");

  //recibir data del frontend
  socket.on("formData", (data) => {
    console.log(data);
    //guardar la data en la bbdd
    saveProduct(data);
    //
    //broadcast
    //io.sockets.emit("form", productos);
  });

  //enviar todos los prod al front para renderizar
  const productos = await getAll();
  socket.emit("renderData", productos);

  //chat
  socket.on("chat", (data) => {
    console.log(data);

    io.sockets.emit("chat", data);
  });
});
