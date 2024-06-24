exports.up = function(knex) {
    return knex.schema.alterTable('produtos', function(table) {
      table.string('produto_imagem').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('produtos', function(table) {
      table.dropColumn('produto_imagem');
    });
  };
  