exports.up = function(knex) {
    return knex.schema.createTable('clientes', function(table) {
      table.increments('id').primary();
      table.string('nome', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('cpf', 11).notNullable().unique();
      table.string('cep', 8).notNullable();
      table.string('rua', 255).notNullable();
      table.string('numero', 10).notNullable();
      table.string('bairro', 255).notNullable();
      table.string('cidade', 255).notNullable();
      table.string('estado', 2).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('clientes');
  };
  