exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_db', function (table) {
    table.increments('id') 
    .unsigned()
    .index();
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
