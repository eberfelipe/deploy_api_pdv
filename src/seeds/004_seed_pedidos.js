exports.seed = function(knex) {
  return knex('pedidos').del()
    .then(() => knex.raw('ALTER SEQUENCE pedidos_id_seq RESTART WITH 1'))
    .then(function () {
      return knex('pedidos').insert([
        {id: 1, cliente_id: 127, observacao: 'Deixar na portaria', valor_total: 2500},
        {id: 2, cliente_id: 128, observacao: 'Entregar no período da manhã', valor_total: 1500},
        {id: 3, cliente_id: 129, observacao: 'Favor não chamar no interfone', valor_total: 3000},
        {id: 4, cliente_id: 130, observacao: null, valor_total: 2000},
        {id: 5, cliente_id: 131, observacao: 'Deixar com o vizinho ao lado', valor_total: 5000},
      ]);
    });
};
