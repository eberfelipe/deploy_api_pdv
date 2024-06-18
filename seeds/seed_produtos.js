exports.seed = function(knex) {
  return knex('produtos').del()
    .then(function () {
      return knex('produtos').insert([
        {descricao: 'Arroz', quantidade_estoque: 50, valor: 200, categoria_id: 4},
        {descricao: 'Feijão', quantidade_estoque: 30, valor: 300, categoria_id: 4},
        {descricao: 'Batata Frita', quantidade_estoque: 20, valor: 150, categoria_id: 4},
        {descricao: 'Leite', quantidade_estoque: 40, valor: 400, categoria_id: 4},
        {descricao: 'Açúcar', quantidade_estoque: 35, valor: 250, categoria_id: 4},
        {descricao: 'Óleo de Soja', quantidade_estoque: 25, valor: 500, categoria_id: 4},
        {descricao: 'Macarrão', quantidade_estoque: 45, valor: 350, categoria_id: 4},
        {descricao: 'Sal', quantidade_estoque: 60, valor: 100, categoria_id: 4},
        {descricao: 'Farinha de Trigo', quantidade_estoque: 15, valor: 450, categoria_id: 4},
        {descricao: 'Café', quantidade_estoque: 50, valor: 600, categoria_id: 4}
      ]);
    });
};
