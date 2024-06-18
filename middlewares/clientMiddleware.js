const knex = require("../config/database");

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

const verificarNome = (req, res, next) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ mensagem: "Nome é obrigatório" });
  }
  next();
};

const verificarEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ mensagem: "Email é obrigatório" });
  }
  next();
};

const verificarCpf = (req, res, next) => {
  const { cpf } = req.body;
  if (!cpf) {
    return res.status(400).json({ mensagem: "CPF é obrigatório" });
  }
  next();
};

const verificarCpfExisteAtualizacao = async (req, res, next) => {
  const { id } = req.params;
  const { cpf } = req.body;
  const cpfExiste = await knex("clientes").where({ cpf }).whereNot({ id }).first();
  if (cpfExiste) {
    return res.status(400).json({ mensagem: "CPF já existe" });
  }
  next();
};

const verificarEmailExisteAtualizacaoClientes = async (req, res, next) => {
  const { email } = req.body;
  const { id } = req.params;
  const emailExiste = await knex("clientes").where({ email }).whereNot({ id }).first();
  if (emailExiste) {
    return res.status(400).json({ mensagem: "Email já existe" });
  }
  next();
};

const validarNovoCliente = async (req, res, next) => {
  const { nome, email, cpf } = req.body;
  if (!nome || !email || !cpf) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }
  try {
    const cliente = await knex('clientes').where({ email }).first();
    if (cliente) {
      return res.status(401).json({ mensagem: "Email já registrado" });
    }
    const clienteCpf = await knex('clientes').where({ cpf }).first();
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
  verificarNome,
  verificarEmail,
  verificarCpf,
  verificarCpfExisteAtualizacao,
  verificarEmailExisteAtualizacaoClientes,
  validarNovoCliente
};
