const dotenv = require("dotenv");
const express = require("express");
const Container = require("../desafio2/desafio2");

//env config
dotenv.config();

//start app
const app = express();

//define port
const PORT = process.env.PORT;

//middlewares
app.use(express.json());

//endpoints
app.get("/", (req, res) => {
    res.send("hello Express server");
});

app.get("/productos", async (req, res) => {
    const data = await new Container("./desafio3/products.json").getAll();
    res.send(data);
});

app.get("/productoRandom", async (req, res) => {
    const data = await new Container("./desafio3/products.json").getAll();
    const random = data[Math.floor(Math.random() * data.length)];
    res.send(random);
});

//server listener
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/`);
});
