const path = require('path')

module.exports = {
  host: 'olimat.feathersjs.com',
  port: 'PORT',
  knex: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'postgres',
      user: 'postgres',
      password: 'dev123'
    },
    migrations: {
      directory: path.resolve(__dirname, '..', 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'db', 'seeds')
    }
  }
}
