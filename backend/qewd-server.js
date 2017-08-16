// Setup ES2017 for the server?
const qewd = require('qewd').master

const config = {
  managementPassword: 'keepThisSecret!',
  serverName: 'OliMAT Backend (QEWD Server)',
  port: 8080,
  poolSize: 2,
  database: {
    type: 'redis'
  }
}

qewd.start(config)
