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

module.exports = listProducts;
