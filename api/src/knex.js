const environment = process.env.NODE_ENV
const knexFile = require('../knexfile.js')
const knexConfig = knexFile[environment]
const knex = require('knex')

module.exports = function () {
  const app = this
  const db = knex(knexConfig)

  app.set('knexClient', db)
}
