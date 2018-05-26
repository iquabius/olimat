import { Query } from './Query';
import { auth } from './Mutation/auth';
import { tests } from './Mutation/tests';
import { schools } from './Mutation/schools';
import { olympiads } from './Mutation/olympiads';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...auth,
    ...tests,
    ...schools,
    ...olympiads,
  },
  AuthPayload,
};
