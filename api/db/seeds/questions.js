
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('questions').insert({
          wording: 'Quanto é 3+3?'
        }),
        knex('questions').insert({
          wording: 'Quanto é 5-3?'
        })
      ])
    })
}
