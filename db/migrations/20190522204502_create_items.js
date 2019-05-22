
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', function (table) {
    table.increments('id') 
    .unsigned()
    .index(); 
    table.text('name');
    table.integer('price');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');  
};
