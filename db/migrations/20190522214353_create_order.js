exports.up = function(knex, Promise) {
  return knex.schema.createTable('order', function (table) {
    table.increments('id') 
    .unsigned()
    .index(); 
    table.string('name');
    table.integer('phone number');
  })
  
  .createTable('order_items', function (table) {
    table.integer('order_id').references('id').inTable('order');
    table.integer('item_id').references('id').inTable('items');
  })
};
  
  exports.down = function(knex, Promise) {
    return knex.schema
    .dropTable('order')  
    .dropTable('order_items');
  };
