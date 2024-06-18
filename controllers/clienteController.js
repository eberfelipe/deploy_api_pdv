const knex = require('knex');
const knexfile = require('../config/knexfile');

const db = knex(knexfile.development);

// Função para listar todos os clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await db('clientes').select('*');
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
};

module.exports = {
  listarClientes,
};
