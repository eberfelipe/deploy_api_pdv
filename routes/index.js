const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const produtoRoutes = require('./produtoRoutes');
const clienteRoutes = require('./clienteRoutes');

router.use(usuarioRoutes);
router.use(produtoRoutes);
router.use(clienteRoutes);

module.exports = router;
