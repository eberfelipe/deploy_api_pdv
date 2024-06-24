const knex = require("../config/database");

const validarCampos = (camposObrigatorios) => (req, res, next) => {
  for (const campo of camposObrigatorios) {
    if (!req.body[campo]) {
      return res.status(400).json({ mensagem: `O campo ${campo} é obrigatório` });
    }
  }
  next();
};

const verificarId = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ mensagem: "ID não fornecido" });
  }
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID deve ser um número" });
  }
  next();
};

const verificarClienteIdExiste = async (req, res, next) => {
  const { id } = req.params;
  const idExiste = await knex('clientes').where({ id }).first();
  if (!idExiste) {
    return res.status(404).json({ mensagem: "Cliente não encontrado" });
  }
  next();
};

const verificarCpfEmailExistenteAtualizacao = async (req, res, next) => {
  const { id } = req.params;
  const { cpf, email } = req.body;
  const cpfExiste = await knex("clientes").where({ cpf }).whereNot({ id }).first();
  const emailExiste = await knex("clientes").where({ email }).whereNot({ id }).first();
  
  if (cpfExiste) {
    return res.status(400).json({ mensagem: "CPF já existe" });
  }
  if (emailExiste) {
    return res.status(400).json({ mensagem: "Email já existe" });
  }
  next();
};

const validarNovoCliente = async (req, res, next) => {
  const { email, cpf } = req.body;
  try {
    const clienteEmail = await knex('clientes').where({ email }).first();
    const clienteCpf = await knex('clientes').where({ cpf }).first();

    if (clienteEmail) {
      return res.status(401).json({ mensagem: "Email já registrado" });
    }
    if (clienteCpf) {
      return res.status(401).json({ mensagem: "CPF já registrado" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  verificarId,
  verificarClienteIdExiste,
  validarCampos,
  verificarCpfEmailExistenteAtualizacao,
  validarNovoCliente
};
