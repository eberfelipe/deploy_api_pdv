exports.up = function(knex) {
    return knex.schema.createTable('pedidos', function(table) {
      table.increments('id').primary();
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').notNullable();
      table.text('observacao').nullable();
      table.integer('valor_total').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pedidos');
  };
  