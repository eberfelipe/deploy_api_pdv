const express = require('express');
const router = express.Router();
const { cadastrarPedido, listarPedidos } = require('../controladores/controladorPedidos');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

router.post('/', autenticarToken, cadastrarPedido);
router.get('/', autenticarToken, listarPedidos);

module.exports = router;
