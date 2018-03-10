import { Query } from './Query'
import { auth } from './Mutation/auth'
import { tests } from './Mutation/tests'
import { AuthPayload } from './AuthPayload'

export default {
  Query,
  Mutation: {
    ...auth,
    ...tests,
  },
  AuthPayload,
}
