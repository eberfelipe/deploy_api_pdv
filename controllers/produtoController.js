const knex = require('knex');
const knexfile = require('../config/knexfile');

const db = knex(knexfile.development);

// Função para excluir produto por ID
const excluirProduto = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar se o produto existe
    const produto = await db('produtos').where({ id }).first();
    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Excluir o produto
    await db('produtos').where({ id }).del();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
};

module.exports = {
  excluirProduto,
};
