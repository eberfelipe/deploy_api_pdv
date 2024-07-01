const express = require('express');
const router = express.Router();
const { cadastrarPedido } = require('../controladores/controladorPedidos');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

router.post('/', autenticarToken, cadastrarPedido);

module.exports = router;