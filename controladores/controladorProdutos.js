const knex = require("../config/database");

const deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex("produtos").where({ id }).first();
    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado" });
    }
    //validação na exclusão do produto
    const produtoVinculadoPedido = await knex("pedido_produtos")
      .where({ produto_id: id })
      .first();
    if (produtoVinculadoPedido) {
      return res.status(400).json({
        mensagem: "Produto vinculado a um pedido, não pode ser excluído",
      });
    }

    await knex("produtos").where({ id }).del();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao excluir produto" });
  }
};

// Registrar produto
const registrarProduto = async (req, res) => {
  const camposObrigatorios = [
    "descricao",
    "quantidade_estoque",
    "valor",
    "categoria_id",
  ];
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  for (const campo of camposObrigatorios) {
    if (!req.body[campo]) {
      return res
        .status(400)
        .json({ mensagem: `O campo ${campo} é obrigatório` });
    }
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
      return res.status(400).json({ mensagem: "O produto não foi cadastrado" });
    }

    return res.status(200).json(produto[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  deletarProduto,
  registrarProduto,
};
