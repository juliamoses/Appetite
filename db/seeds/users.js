exports.seed = function(knex, Promise) {
  return knex('users_db').del()
    .then(function () {
      return Promise.all([
        knex('users_db').insert({id: 1, email: 'alice@wonderland.ca', password: 'password'}),
      ]);
    });
};
