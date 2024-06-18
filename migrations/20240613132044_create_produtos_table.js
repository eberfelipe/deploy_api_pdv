exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table) {
      table.increments('id').primary();
      table.string('descricao', 255).notNullable();
      table.integer('quantidade_estoque').notNullable();
      table.integer('valor').notNullable();
      table.integer('categoria_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('produtos');
  };
  