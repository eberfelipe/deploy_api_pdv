const knex = require("../config/database");

const verifyId = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ mensagem: "ID não informado" });
  }

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID precisa ser um número" });
  }
  
  next();
};

const verifyClientIdExists = async (req, res, next) => {
  const { id } = req.params;
  
  console.log("ID recebido na requisição:", id);

  const idExists = await knex('clientes').where({ id }).first();

  console.log("Cliente encontrado:", idExists);

  if (!idExists) {
    return res.status(404).json({ mensagem: "O cliente informado não existe." });
  }

  
  next();
};

const verifyName = (req, res, next) => {
  let { nome } = req.body;

  if (!nome) {
    return res.status(400).json("O Campo nome é obrigatório.");
  }

  next();
};

const verifyEmail = (req, res, next) => {
  let { email } = req.body;

  if (!email) {
    return res.status(400).json("O Campo email é obrigatório.");
  }

  next();
};

const verifyCpf = (req, res, next) => {
  let { cpf } = req.body;

  if (!cpf) {
    return res.status(400).json("O Campo cpf é obrigatório.");
  }

  next();
};

const verifyCpfExistsUpdate = async (req, res, next) => {
  const { id } = req.params;
  const { cpf } = req.body;

  const cpfExiste = await knex("clientes").where({ cpf }).whereNot({ id }).first();

  if (cpfExiste) {
    return res.status(400).json("O CPF já existe");
  }

  next();
};

const verifyEmailExistsUpdateClients = async (req, res, next) => {
  let { email } = req.body;
  const { id } = req.params;

  const emailExiste = await knex("clientes")
    .where({ email })
    .whereNot({ id })
    .first();

  if (emailExiste) {
    return res.status(400).json("O Email já existe");
  }

  next();
};

const validateNewClient = async (req, res, next) => {
  const { nome, email, cpf } = req.body;

  if (!nome || !email || !cpf) {
    return res.status(400).json({message:'Todos os campos devem ser preenchidos!'});
  }

  try {
    const client = await knex('clientes')
      .where({email})
      .first();

    if (client) {
      return res.status(401).json('Email já cadastrado.');
    }

    const clientCpf = await knex('clientes')
      .where({cpf})
      .first();
    
    if (clientCpf) {
      return res.status(401).json('Cpf já cadastrado.');
    }

    next();
  } catch (error) {
    return res.status(401).json(error.message);
  }
}

module.exports = {
  verifyId,
  verifyClientIdExists,
  verifyName,
  verifyEmail,
  verifyCpf,
  verifyCpfExistsUpdate,
  verifyEmailExistsUpdateClients,
  validateNewClient
};