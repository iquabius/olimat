const environment = process.env.NODE_ENV
const knexConfig = require('../config/' + environment).knex
const knex = require('knex')

module.exports = function () {
  const app = this
  // TODO check if database is ready before trying to connect
  //   or try again after some time (try/catch)
  const db = knex(knexConfig)

  // TODO run migrations in development mode
  app.set('knexClient', db)
}
