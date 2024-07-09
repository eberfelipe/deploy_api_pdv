const express = require("express");
const router = express.Router();
const {
  deletarProduto,
  registrarProduto,
  listarProdutos,
  detalharProduto,
  atualizarProduto,
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
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: categoria_id
 *         schema:
 *           type: integer
 *         description: ID da categoria para filtrar os produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   descricao:
 *                     type: string
 *                   quantidade_estoque:
 *                     type: integer
 *                   valor:
 *                     type: integer
 *                   categoria_id:
 *                     type: integer
 *                   produto_imagem:
 *                     type: string
 *       500:
 *         description: Erro ao listar produtos
 */
router.get("/", autenticarToken, listarProdutos);

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Detalha um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do produto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 descricao:
 *                   type: string
 *                 quantidade_estoque:
 *                   type: integer
 *                 valor:
 *                   type: integer
 *                 categoria_id:
 *                   type: integer
 *                 produto_imagem:
 *                   type: string
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao detalhar produto
 */
router.get("/:id", autenticarToken, verificarId, detalharProduto);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro ao atualizar produto
 */
router.put(
  "/:id",
  autenticarToken,
  verificarId,
  multer.single("produto_imagem"),
  validarCampos(["descricao", "quantidade_estoque", "valor", "categoria_id"]),
  atualizarProduto
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
 *       400:
 *         description: Produto vinculado a um pedido não pode ser excluído
 *       500:
 *         description: Erro ao excluir produto
 */
router.delete("/:id", verificarId, autenticarToken, deletarProduto);

module.exports = router;
