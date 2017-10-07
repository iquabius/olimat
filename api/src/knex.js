const environment = process.env.NODE_ENV
const knexFile = require('../knexfile.js')
const knexConfig = knexFile[environment]
const knex = require('knex')

module.exports = function () {
  const app = this
  // TODO check if database is ready before trying to connect
  //   or try again after some time (try/catch)
  const db = knex(knexConfig)

  // TODO run migrations in development mode
  app.set('knexClient', db)
}
