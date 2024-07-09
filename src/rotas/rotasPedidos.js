const express = require('express');
const router = express.Router();
const { cadastrarPedido, listarPedidos } = require('../controladores/controladorPedidos');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints de pedidos
 */

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cadastra um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *               observacao:
 *                 type: string
 *               pedido_produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produto_id:
 *                       type: integer
 *                     quantidade_produto:
 *                       type: integer
 *                     valor_produto:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Pedido cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente ou produto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', autenticarToken, cadastrarPedido);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: cliente_id
 *         schema:
 *           type: integer
 *         description: ID do cliente para filtrar os pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   pedido:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       cliente_id:
 *                         type: integer
 *                       observacao:
 *                         type: string
 *                       valor_total:
 *                         type: integer
 *                   pedido_produtos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         pedido_id:
 *                           type: integer
 *                         produto_id:
 *                           type: integer
 *                         quantidade_produto:
 *                           type: integer
 *                         valor_produto:
 *                           type: integer
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', autenticarToken, listarPedidos);

module.exports = router;
