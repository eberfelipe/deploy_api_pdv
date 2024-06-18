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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { descricao, quantidade_estoque, valor, categoria_id } = req.body;

  if (!descricao || !quantidade_estoque || !valor || !categoria_id) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const product = await knex('produtos').where({ id }).first();

  if (!product) {
    return res.status(404).send('Produto não encontrado');
  }

  try {
    await knex('produtos')
      .where({ id })
      .update({
        descricao,
        quantidade_estoque,
        valor,
        categoria_id
      });

    res.send('Produto editado com sucesso');
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const listProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await knex('produtos').where({ id }).first();
    if (!product) {
      return res.status(404).send('Produto não encontrado');
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  registerProduct,
  updateProduct,
  listProduct
};