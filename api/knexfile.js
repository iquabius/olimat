const path = require('path')

// docker-compose run api npx knex migrate:latest --env development
// docker-compose run api npx knex seed:run --env development
// TODO: find a way to automatically create databases on Docker initialization
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'olimat_dev',
      user: 'postgres',
      password: 'dev123'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'db', 'seeds')
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'olimat_testing',
      user: 'postgres',
      password: 'dev123'
    },
    migrations: {
      directory: path.resolve(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'db', 'seeds')
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
