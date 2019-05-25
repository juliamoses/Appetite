exports.seed = function(knex, Promise) {
  return knex('items').del()
    .then(function () {
      return Promise.all([
        knex('items').insert({name: 'GNOCCO FRITO', price: 1000, image_url: '../images/gnocco.jpg'}),
        knex('items').insert({name: 'BRANZINO', price: 4200, image_url: '../images/brazino.jpg'}),
        knex('items').insert({name: 'TAGLIATELLE', price: 3400, image_url: '../images/tagliaette.jpg'}),
        knex('items').insert({name: 'PIZZA FUNGHI', price: 2800, image_url: '../images/pizza.jpg'}),
        knex('items').insert({name: 'CRUDO CARNE SALADA', price: 2200, image_url: '../images/crudo.jpg'}),
        knex('items').insert({name: 'NEGRONI', price: 1200, image_url: '../images/NEGRONI.jpg'}),
        knex('items').insert({name: 'GRENACHE', price: 9000, image_url: '../images/GRENACHE.jpg'}),
        knex('items').insert({name: 'CARPACCIO', price: 1800, image_url: '../images/CARPACCIO.jpg'})

      ]);
    });
};
