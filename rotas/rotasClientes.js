const express = require('express');
const router = express.Router();
const {
  verificarId,
  verificarClienteIdExiste,
  validarCampos,
  verificarCpfEmailExistenteAtualizacao,
  validarNovoCliente
} = require('../middlewares/middlewareClientes');
const {
  registrarCliente,
  listarClientes,
  obterDetalhesCliente,
  atualizarCliente
} = require('../controladores/controladorClientes');
const autenticarToken = require('../middlewares/middlewareAutenticacao');

router.post('/', validarCampos(['nome', 'email', 'cpf']), validarNovoCliente, registrarCliente);

router.get('/', autenticarToken, listarClientes);

router.get('/:id', autenticarToken, verificarId, verificarClienteIdExiste, obterDetalhesCliente);

router.put('/:id', autenticarToken, verificarId, verificarClienteIdExiste, validarCampos(['nome', 'email', 'cpf']), verificarCpfEmailExistenteAtualizacao, atualizarCliente);

module.exports = router;
