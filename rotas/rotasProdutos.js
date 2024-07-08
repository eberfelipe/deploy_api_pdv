const express = require("express");
const router = express.Router();
const {
  deletarProduto,
  registrarProduto,
} = require("../controladores/controladorProdutos");
const {
  validarCampos,
  verificarId,
} = require("../middlewares/middlewareClientes");
const autenticarToken = require("../middlewares/middlewareAutenticacao");
const multer = require("../config/multer");

router.post(
  "/",
  multer.single("produto_imagem"),
  validarCampos(["descricao", "quantidade_estoque", "valor", "categoria_id"]),
  registrarProduto
);

router.delete("/:id", verificarId, autenticarToken, deletarProduto);

module.exports = router;