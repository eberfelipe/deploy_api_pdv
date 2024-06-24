exports.up = function(knex) {
    return knex.schema.createTable('pedido_produtos', function(table) {
      table.increments('id').primary();
      table.integer('pedido_id').unsigned().references('id').inTable('pedidos').notNullable();
      table.integer('produto_id').unsigned().references('id').inTable('produtos').notNullable();
      table.integer('quantidade_produto').notNullable();
      table.integer('valor_produto').notNullable(); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('pedido_produtos');
  };
  