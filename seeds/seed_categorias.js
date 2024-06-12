// seeds/timestamp_seed_categorias.js

exports.seed = function(knex) {
  return knex('categorias').del()
    .then(function () {
      // Insere os dados iniciais na tabela 'categorias'
      return knex('categorias').insert([
        {descricao: 'Informática'},
        {descricao: 'Celulares'},
        {descricao: 'Beleza e Perfumaria'},
        {descricao: 'Mercado'},
        {descricao: 'Livros e Papelaria'},
        {descricao: 'Brinquedos'},
        {descricao: 'Moda'},
        {descricao: 'Bebê'},
        {descricao: 'Games'}
      ]);
    });
};
