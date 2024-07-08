const express = require('express');
const router = express.Router();
const controladorPedido = require('../controladores/controladorPedido');
const { cadastrarPedido } = require('../controladores/controladorPedidos');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

// Endpoint para listar pedidos
router.get('/pedido', autenticarToken, controladorPedido.listarPedidos);

// Endpoint para cadastrar pedidos
router.post('/pedido', autenticarToken, cadastrarPedido);

module.exports = router;
