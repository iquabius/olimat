const environment = process.env.NODE_ENV
const knexConfig = require('../config/' + environment).knex
const knex = require('knex')

module.exports = function () {
  const app = this
  // TODO check if database is ready before trying to connect
  //   or try again after some time (try/catch)
  console.log('postgres: Connecting to the database...')
  const db = knex(knexConfig)

  if (process.env.NODE_ENV === 'development') {
    console.log('postgres: Trying to migrate database with Knex')
    db.migrate.latest()
      .then(() => {
        console.log('postgres: Migration run successfully')
        console.log('postgres: Trying to seed the database now')
        return db.seed.run()
          .then(() => {
            console.log('postgres: Database seeding run successfully')
          }).catch(error =>
                   console.error('postgres: Error seeding the database', error))
      }).catch(error =>
               console.error('postgres: Error trying to migrate the database', error))
  }

  // TODO run migrations in development mode
  app.set('knexClient', db)
}
