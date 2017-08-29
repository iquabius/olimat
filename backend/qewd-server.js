// Setup ES2017 for the server?
const path = require('path')
const qewd = require('qewd').master

const config = {
  managementPassword: 'keepThisSecret!',
  serverName: 'OliMAT Backend (QEWD Server)',
  port: 8080,
  poolSize: 2,
  database: {
    type: 'redis',
    params: {
      host: 'redis',
      port: 6379
    }
  },
  moduleMap: {
    'OliMAT': path.resolve(__dirname, 'olimat-module')
  }
}

qewd.start(config)
