exports.seed = function(knex) {
  return knex('produtos').del()
    .then(() => knex.raw('ALTER SEQUENCE produtos_id_seq RESTART WITH 1'))
    .then(function () {
      return knex('produtos').insert([
        {id: 122, descricao: 'Arroz', quantidade_estoque: 50, valor: 200, categoria_id: 4},
        {id: 123, descricao: 'Feijão', quantidade_estoque: 30, valor: 300, categoria_id: 4},
        {id: 124, descricao: 'Batata Frita', quantidade_estoque: 20, valor: 150, categoria_id: 4},
        {id: 125, descricao: 'Leite', quantidade_estoque: 40, valor: 400, categoria_id: 4},
        {id: 126, descricao: 'Açúcar', quantidade_estoque: 35, valor: 250, categoria_id: 4},
        {id: 127, descricao: 'Óleo de Soja', quantidade_estoque: 25, valor: 500, categoria_id: 4},
        {id: 128, descricao: 'Macarrão', quantidade_estoque: 45, valor: 350, categoria_id: 4},
        {id: 129, descricao: 'Sal', quantidade_estoque: 60, valor: 100, categoria_id: 4},
        {id: 130, descricao: 'Farinha de Trigo', quantidade_estoque: 15, valor: 450, categoria_id: 4},
        {id: 131, descricao: 'Café', quantidade_estoque: 50, valor: 600, categoria_id: 4}
      ]);
    });
};
