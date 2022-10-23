const express = require("express");
const { engine } = require("express-handlebars");
//const cors = require("cors");
const { Server } = require("socket.io");
const productRoutes = require("./routes/routes");

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
//app.use(cors());
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
io.on("connection", function (socket) {
  console.log(`socket ${socket.id} connected on ${port}`);

  //enviar data del server al frontend
  socket.emit("msgFromServer", "connected successfully");

  //recibir data del frontend y transmitir a todos los sockets conectados
  socket.on("form", function (data) {
    io.sockets.emit("form", data);
    });
});
