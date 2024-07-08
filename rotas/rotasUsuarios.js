const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  logarUsuario,
  obterPerfilUsuario,
  atualizarPerfilUsuario,
} = require("../controladores/controladorUsuarios");
const { validarCampos } = require("../middlewares/middlewareClientes"); // Usando o mesmo middleware de validação de campos
const autenticarToken = require("../middlewares/middlewareAutenticacao");

router.post(
  "/registro",
  validarCampos(["nome", "email", "senha"]),
  registrarUsuario
);

router.post("/login", validarCampos(["email", "senha"]), logarUsuario);

router.get("/perfil", autenticarToken, obterPerfilUsuario);

router.put(
  "/perfil",
  autenticarToken,
  validarCampos(["nome", "email", "senha"]),
  atualizarPerfilUsuario
);

module.exports = router;
