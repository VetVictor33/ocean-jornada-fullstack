const express = require("express");
const app = express();

//Endpoint / -> Hello world!

app.get("/", function (req, res) {
    res.send("Hello world!!");
});

//Endpoit /oi -> Olá, mundo!

app.get("/oi", function (req, res) {
    res.send("Olá, mundo!")
});

//lista de informações
const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

//CRUD -> Lista de informações

//Endpoint Read All -> [GET] /item
app.get("/itens", function (req, res) {
    res.send(itens);
});

app.listen(3000);
