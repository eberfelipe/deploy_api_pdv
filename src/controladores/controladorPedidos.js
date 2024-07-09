const knex = require('../config/database');

const cadastrarPedido = async (req, res) => {
  const { cliente_id, observacao, pedido_produtos } = req.body;

  if (!cliente_id || !pedido_produtos || !Array.isArray(pedido_produtos) || pedido_produtos.length === 0) {
    return res.status(400).json({ mensagem: 'Dados inválidos' });
  }

  try {
    const cliente = await knex('clientes').where({ id: cliente_id }).first();
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }

    let valor_total = 0;

    for (const produto of pedido_produtos) {
      const produtoEncontrado = await knex('produtos').where({ id: produto.produto_id }).first();
      if (!produtoEncontrado) {
        return res.status(404).json({ mensagem: `Produto não encontrado: ${produto.produto_id}` });
      }

      if (produtoEncontrado.quantidade_estoque < produto.quantidade_produto) {
        return res.status(400).json({ mensagem: `Quantidade insuficiente para o produto: ${produto.produto_id}` });
      }

      valor_total += produtoEncontrado.valor * produto.quantidade_produto;
    }

    const [pedido_id] = await knex('pedidos').insert({
      cliente_id,
      observacao,
      valor_total
    }).returning('id');

    for (const produto of pedido_produtos) {
      await knex('pedido_produtos').insert({
        pedido_id,
        produto_id: produto.produto_id,
        quantidade_produto: produto.quantidade_produto,
        valor_produto: produto.valor_produto
      });

      await knex('produtos')
        .where({ id: produto.produto_id })
        .decrement('quantidade_estoque', produto.quantidade_produto);
    }

    return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso' });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao cadastrar pedido' });
  }
};

const listarPedidos = async (req, res) => {
  const { cliente_id } = req.query;

  try {
    let pedidos;
    if (cliente_id) {
      pedidos = await knex('pedidos').where({ cliente_id });
    } else {
      pedidos = await knex('pedidos');
    }

    const resposta = [];
    for (const pedido of pedidos) {
      const pedido_produtos = await knex('pedido_produtos').where({ pedido_id: pedido.id });
      resposta.push({
        pedido,
        pedido_produtos
      });
    }

    return res.status(200).json(resposta);
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao listar pedidos' });
  }
};

module.exports = {
  cadastrarPedido,
  listarPedidos
};
