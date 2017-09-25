
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          name: 'Fulano',
          email: 'fulano@unemat.br'
        }),
        knex('users').insert({
          name: 'Cicrano',
          email: 'cicrano@gmail.com'
        })
      ])
    })
}
