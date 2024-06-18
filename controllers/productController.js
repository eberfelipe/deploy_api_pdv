const db = require('../config/database');

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await db('produtos').where({ id }).first();
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    await db('produtos').where({ id }).del();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao excluir produto' });
  }
};

module.exports = {
  deletarProduto,
};
