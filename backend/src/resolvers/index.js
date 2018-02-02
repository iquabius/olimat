const { Query } = require('./Query')
const { auth } = require('./Mutation/auth')
const { tests } = require('./Mutation/tests')
const { AuthPayload } = require('./AuthPayload')

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...tests,
  },
  AuthPayload,
}
