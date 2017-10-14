const path = require('path')

// docker-compose run api npx knex migrate:latest --env development
// docker-compose run api npx knex seed:run --env development
module.exports = {
  knex: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'olimat_dev',
      user: 'postgres',
      password: 'dev123'
    },
    debug: false,
    migrations: {
      directory: path.resolve(__dirname, '..', 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, '..', 'db', 'seeds')
    }
  }
}
