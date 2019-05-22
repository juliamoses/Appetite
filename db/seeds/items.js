exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'gnocco frito', price: 1000}),
        knex('items').insert({name: 'branzino', price: 4200}),
        knex('items').insert({name: 'tagliatelle', price: 3400}),
        knex('items').insert({name: 'pizza funghi', price: 2800}),
        knex('items').insert({name: 'crudo carne salada', price: 2200}),
        knex('items').insert({name: 'negroni', price: 1200}),
        knex('items').insert({name: 'grenach', price: 9000})
      ]);
    });
};
