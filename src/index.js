require("dotenv").config();
const express = require("express");
const app = express();
const porta = process.env.PORT || 3000;

app.use(express.json());

const rotasCategorias = require("../rotas/rotasCategorias"); 
const rotasUsuarios = require("../rotas/rotasUsuarios"); 
const rotasClientes = require("../rotas/rotasClientes"); 
const rotasProdutos = require("../rotas/rotasProdutos"); 

app.use("/categorias", rotasCategorias);
app.use("/usuarios", rotasUsuarios);
app.use("/clientes", rotasClientes);
app.use("/produtos", rotasProdutos);

app.get("/", (req, res) => {
  res.send("API está rodando");
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
