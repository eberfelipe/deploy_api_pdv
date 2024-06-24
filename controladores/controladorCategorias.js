const knex = require('../config/database');

const listarCategorias = async (req, res) => {
  try {
    const categorias = await knex.select('*').from('categorias');
    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
};

module.exports = {
  listarCategorias
};