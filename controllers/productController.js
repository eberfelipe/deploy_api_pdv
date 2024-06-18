const knex = require("../config/database");

const listProducts = async (req, res) => {
  const categoria_id = req.query.categoria_id;
  let produtosFiltrados;

  try {
    if (categoria_id) {
      produtosFiltrados = await knex("produtos").where({ categoria_id });
      console.log(produtosFiltrados);
    } else {
      produtosFiltrados = await knex("produtos");
    }

    return res.status(200).json(produtosFiltrados);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      Mensagem: "Erro interno no servidor!",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.user;
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
  listProducts,
  updateProduct,
  listProduct
};