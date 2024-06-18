const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");
const {
  verificarId,
  verificarClienteIdExiste,
  verificarNome,
  verificarEmail,
  verificarCpf,
  verificarCpfExisteAtualizacao,
  verificarEmailExisteAtualizacaoClientes,
  validarNovoCliente
} = require("../middlewares/clientMiddleware");
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/:id", authMiddleware, clientController.obterDetalhesCliente);
router.post('/', authMiddleware, validarNovoCliente, clientController.registrarCliente);
router.put('/:id', authMiddleware, verificarId, verificarClienteIdExiste, verificarNome, verificarEmail, verificarCpf, verificarCpfExisteAtualizacao, verificarEmailExisteAtualizacaoClientes, clientController.atualizarCliente);
router.get('/', authMiddleware, clientController.listarClientes);

module.exports = router;
