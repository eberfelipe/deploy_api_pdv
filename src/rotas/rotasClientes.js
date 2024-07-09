const express = require('express');
const router = express.Router();
const {
  verificarId,
  verificarClienteIdExiste,
  validarCampos,
  verificarCpfEmailExistenteAtualizacao,
  validarNovoCliente
} = require('../middlewares/middlewareValidacoes'); 
const {
  registrarCliente,
  listarClientes,
  obterDetalhesCliente,
  atualizarCliente
} = require('../controladores/controladorClientes'); 
const autenticarToken = require('../middlewares/middlewareAutenticacao'); 

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Endpoints de clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Registra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               cep:
 *                 type: string
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', validarCampos(['nome', 'email', 'cpf']), validarNovoCliente, registrarCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do cliente
 *                   nome:
 *                     type: string
 *                     description: Nome do cliente
 *                   email:
 *                     type: string
 *                     description: Email do cliente
 *                   cpf:
 *                     type: string
 *                     description: CPF do cliente
 *                   cep:
 *                     type: string
 *                     description: CEP do cliente
 *                   rua:
 *                     type: string
 *                     description: Rua do cliente
 *                   numero:
 *                     type: string
 *                     description: Número do endereço do cliente
 *                   bairro:
 *                     type: string
 *                     description: Bairro do cliente
 *                   cidade:
 *                     type: string
 *                     description: Cidade do cliente
 *                   estado:
 *                     type: string
 *                     description: Estado do cliente
 */
router.get('/', autenticarToken, listarClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtém os detalhes de um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do cliente
 *                 nome:
 *                   type: string
 *                   description: Nome do cliente
 *                 email:
 *                   type: string
 *                   description: Email do cliente
 *                 cpf:
 *                   type: string
 *                   description: CPF do cliente
 *                 cep:
 *                   type: string
 *                   description: CEP do cliente
 *                 rua:
 *                   type: string
 *                   description: Rua do cliente
 *                 numero:
 *                   type: string
 *                   description: Número do endereço do cliente
 *                 bairro:
 *                   type: string
 *                   description: Bairro do cliente
 *                 cidade:
 *                   type: string
 *                   description: Cidade do cliente
 *                 estado:
 *                   type: string
 *                   description: Estado do cliente
 *       404:
 *         description: Cliente não encontrado
 */
router.get('/:id', autenticarToken, verificarId, verificarClienteIdExiste, obterDetalhesCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza os dados de um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do cliente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               cep:
 *                 type: string
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', autenticarToken, verificarId, verificarClienteIdExiste, validarCampos(['nome', 'email', 'cpf']), verificarCpfEmailExistenteAtualizacao, atualizarCliente);

module.exports = router;
