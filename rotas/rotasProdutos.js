const express = require('express');
const router = express.Router();
const {
  deletarProduto,
  registrarProduto
} = require('../controladores/controladorProdutos');
const {
  validarCampos,
  verificarId  
} = require('../middlewares/middlewareClientes');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

router.post('/', validarCampos(['descricao', 'quantidade_estoque', 'valor', 'categoria_id']), registrarProduto);

router.delete('/:id', verificarId, autenticarToken, deletarProduto);

module.exports = router;
