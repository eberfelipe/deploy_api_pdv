require("dotenv").config();
const express = require("express");
const app = express();
const porta = process.env.PORT || 3000;

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API PDV",
      version: "1.0.0",
      description: "Documentação da API do PDV",
    },
    servers: [
      {
        url: `http://localhost:${porta}`,
      },
    ],
  },
  apis: ["./src/rotas/*.js"], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
