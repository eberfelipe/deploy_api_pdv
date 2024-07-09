require("dotenv").config();
const express = require("express");
const app = express();
const porta = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const path = require("path");

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, "swagger.json"), "utf8"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

const rotasCategorias = require("./rotas/rotasCategorias");
const rotasUsuarios = require("./rotas/rotasUsuarios");
const rotasClientes = require("./rotas/rotasClientes");
const rotasProdutos = require("./rotas/rotasProdutos");
const rotasPedidos = require("./rotas/rotasPedidos");

app.use("/categorias", rotasCategorias);
app.use("/usuarios", rotasUsuarios);
app.use("/clientes", rotasClientes);
app.use("/produtos", rotasProdutos);
app.use("/pedidos", rotasPedidos);

app.get("/", (req, res) => {
  res.send("API está rodando");
});

app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
