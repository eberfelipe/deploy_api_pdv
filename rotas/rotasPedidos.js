const express = require('express');
const router = express.Router();
const controladorPedido = require('../controladores/controladorPedido');
const authenticate = require('../middlewares/middlewareAutenticacao');

router.get('/pedido', authenticate, controladorPedido.listarPedidos);

module.exports = router;
