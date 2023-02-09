const express = require("express");
//importando o mongodb
const { MongoClient } = require("mongodb");

//variáveis para a url e nome do banco de dados
//URL = localhost ou 127.0.0.1:27017
const DB_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "ocean-fullstack-09-02-2023";

//função assíncrona para aguardar a conexão com o banco de dados
async function main() {
    //estabelecendo conexão com o bango de dados
    console.log("Conectando ao banco de dados...")
    const client = await MongoClient.connect(DB_URL);
    const db = client.db(DB_NAME);
    const collection = db.collection("itens");
    console.log("Conexão realizada com sucesso!");


    const app = express();


    //Definir que o que vier do body da requisição está em JSON
    app.use(express.json());

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

    //CRUD [Cread, Read, Update, Delete]-> Lista de informações

    //Endpoint Read All -> [GET] /item
    app.get("/itens", async function (req, res) {
        //requisitando documentos do MongoDB e transformando em array
        const documentos = await collection.find().toArray();
        res.send(documentos);
    });

    //-------fim da aula 04

    //Endpoit Read Single by ID -> [GET] /itens/:id
    app.get("/itens/:id", function (req, res) { // :id permite que qualquer texto digitado pelo usuário seja aceito como parâmetro
        const id = req.params.id; //recuperando o parâmetro enviado pelo usuário
        const item = itens[id - 1];
        res.send(item);
    });

    //Endpoit Create -> [POST] /itens
    //Precisa criar um jason no body utilizando o thunderclient
    app.post("/itens", function (req, res) {
        //console.log(req.body) //--> entendendo o que vem da requisição
        const item = req.body;
        itens.push(item.nome);
        res.send("Item criado com sucesso");
    });

    app.listen(3000);

}

main();