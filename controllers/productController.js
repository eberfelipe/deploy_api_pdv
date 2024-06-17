const knex = require("../config/database");

const registerProduct = async (req, res) => {
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao) {
    return res.status(400).json("O campo descricao é obrigatório");
  }

  if (!quantidade_estoque) {
    return res.status(400).json("O campo quantidade_estoque é obrigatório");
  }

  if (!valor) {
    return res.status(400).json("O campo valor é obrigatório");
  }

  if (!categoria_id) {
    return res.status(400).json("O campo categoria_id é obrigatório");
  }

  try {
    const produto = await knex("produtos")
      .insert({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      })
      .returning("*");

    if (!produto[0]) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.status(200).json(produto[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  registerProduct,
};
