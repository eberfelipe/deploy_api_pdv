const express = require("express");
const router = express.Router();
const {
  deletarProduto,
  registrarProduto,
} = require("../controladores/controladorProdutos");
const {
  validarCampos,
  verificarId,
} = require("../middlewares/middlewareValidacoes");
const autenticarToken = require("../middlewares/middlewareAutenticacao");
const multer = require("../config/multer");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Endpoints de produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               quantidade_estoque:
 *                 type: integer
 *               valor:
 *                 type: integer
 *               categoria_id:
 *                 type: integer
 *               produto_imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/",
  multer.single("produto_imagem"),
  validarCampos(["descricao", "quantidade_estoque", "valor", "categoria_id"]),
  registrarProduto
);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Exclui um produto
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/:id", verificarId, autenticarToken, deletarProduto);

module.exports = router;
