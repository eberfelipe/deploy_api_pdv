exports.seed = function(knex) {
  return knex('pedido_produtos').del()
    .then(() => knex.raw('ALTER SEQUENCE pedido_produtos_id_seq RESTART WITH 1'))
    .then(function () {
      return knex('pedido_produtos').insert([
        {id: 1, pedido_id: 1, produto_id: 122, quantidade_produto: 5, valor_produto: 1000},
        {id: 2, pedido_id: 1, produto_id: 123, quantidade_produto: 3, valor_produto: 900},
        {id: 3, pedido_id: 1, produto_id: 124, quantidade_produto: 2, valor_produto: 600},
        {id: 4, pedido_id: 2, produto_id: 125, quantidade_produto: 2, valor_produto: 800},
        {id: 5, pedido_id: 2, produto_id: 126, quantidade_produto: 1, valor_produto: 250},
        {id: 6, pedido_id: 2, produto_id: 127, quantidade_produto: 1, valor_produto: 450},
        {id: 7, pedido_id: 3, produto_id: 128, quantidade_produto: 4, valor_produto: 1400},
        {id: 8, pedido_id: 3, produto_id: 129, quantidade_produto: 6, valor_produto: 600},
        {id: 9, pedido_id: 3, produto_id: 130, quantidade_produto: 3, valor_produto: 1350},
        {id: 10, pedido_id: 4, produto_id: 131, quantidade_produto: 5, valor_produto: 3000},
        {id: 11, pedido_id: 4, produto_id: 122, quantidade_produto: 10, valor_produto: 2000},
        {id: 12, pedido_id: 5, produto_id: 123, quantidade_produto: 5, valor_produto: 1500},
        {id: 13, pedido_id: 5, produto_id: 124, quantidade_produto: 10, valor_produto: 3000},
        {id: 14, pedido_id: 5, produto_id: 125, quantidade_produto: 10, valor_produto: 4000},
      ]);
    });
};
