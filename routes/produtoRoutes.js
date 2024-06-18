const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authenticate = require('../middlewares/authenticate');

// Endpoint para excluir produto por ID
router.delete('/produto/:id', authenticate, produtoController.excluirProduto);

module.exports = router;
