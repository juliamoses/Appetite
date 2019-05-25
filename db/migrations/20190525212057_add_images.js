exports.up = function(knex, Promise) {
    return knex.schema.table('items', function(t) {
        t.string('image_url').notNull().defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('items', function(t) {
        t.dropColumn('image_url');
    });
};