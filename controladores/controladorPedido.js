const knex = require('knex');
const knexfile = require('../config/knexfile');

const db = knex(knexfile.development);

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    let pedidos;
    
    if (cliente_id) {
      pedidos = await db('pedidos').where({ cliente_id });
    } else {
      pedidos = await db('pedidos');
    }

    const pedidosComProdutos = await Promise.all(
      pedidos.map(async (pedido) => {
        const pedido_produtos = await db('pedido_produtos').where({ pedido_id: pedido.id });
        return {
          pedido,
          pedido_produtos
        };
      })
    );

    res.status(200).json(pedidosComProdutos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

module.exports = {
  listarPedidos,
};
