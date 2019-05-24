exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'GNOCCO FRITO', price: 1000}),
        knex('items').insert({name: 'BRANZINO', price: 4200}),
        knex('items').insert({name: 'TAGLIATELLE', price: 3400}),
        knex('items').insert({name: 'PIZZA FUNGHI', price: 2800}),
        knex('items').insert({name: 'CRUDO CARNE SALADA', price: 2200}),
        knex('items').insert({name: 'NEGRONI', price: 1200}),
        knex('items').insert({name: 'GRENACHE', price: 9000}),
        knex('items').insert({name: 'CARPACCIO', price: 1800}),

      ]);
    });
};
