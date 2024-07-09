const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  logarUsuario,
  obterPerfilUsuario,
  atualizarPerfilUsuario,
} = require("../controladores/controladorUsuarios");
const { validarCampos } = require("../middlewares/middlewareValidacoes"); // Usando o mesmo middleware de validação de campos
const autenticarToken = require("../middlewares/middlewareAutenticacao");

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de usuários
 */

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Usuários]
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
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/registro",
  validarCampos(["nome", "email", "senha"]),
  registrarUsuario
);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Efetua login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/login", validarCampos(["email", "senha"]), logarUsuario);

/**
 * @swagger
 * /usuarios/perfil:
 *   get:
 *     summary: Obtém o perfil do usuário logado
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Token ausente ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/perfil", autenticarToken, obterPerfilUsuario);

/**
 * @swagger
 * /usuarios/perfil:
 *   put:
 *     summary: Atualiza o perfil do usuário logado
 *     tags: [Usuários]
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
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/perfil",
  autenticarToken,
  validarCampos(["nome", "email", "senha"]),
  atualizarPerfilUsuario
);

module.exports = router;
