const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authenticate = require('../middlewares/authenticate');

// Endpoint para listar todos os clientes
router.get('/cliente', authenticate, clienteController.listarClientes);

module.exports = router;