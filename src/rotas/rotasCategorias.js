const express = require('express');
const router = express.Router();
const { listarCategorias } = require('../controladores/controladorCategorias');

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Endpoints de categorias
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da categoria
 *                   descricao:
 *                     type: string
 *                     description: Descrição da categoria
 */
router.get('/', listarCategorias);

module.exports = router;
