const express = require("express");
const router = express.Router();
const {
  deletarProduto,
  registrarProduto,
  listarProdutos,
  detalharProduto,
  atualizarProduto
} = require("../controladores/controladorProdutos");
const {
  validarCampos,
  verificarId,
} = require("../middlewares/middlewareValidacoes");
const autenticarToken = require("../middlewares/middlewareAutenticacao");
const multer = require("../config/multer");

router.post(
  "/",
  multer.single("produto_imagem"),
  validarCampos(["descricao", "quantidade_estoque", "valor", "categoria_id"]),
  registrarProduto
);

router.get("/", autenticarToken, listarProdutos);

router.get("/:id", autenticarToken, verificarId, detalharProduto);

router.put("/:id", autenticarToken, verificarId, validarCampos(["descricao", "quantidade_estoque", "valor", "categoria_id"]), multer.single("produto_imagem"), atualizarProduto);

router.delete("/:id", verificarId, autenticarToken, deletarProduto);

module.exports = router;
