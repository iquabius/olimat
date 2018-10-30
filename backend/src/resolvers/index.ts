import { Query } from './Query';
import { auth } from './Mutation/auth';
import { cities } from './Mutation/cities';
import { tests } from './Mutation/tests';
import { schools } from './Mutation/schools';
import { olympiads } from './Mutation/olympiads';
import { questions } from './Mutation/questions';
import { AuthPayload } from './AuthPayload';

export default {
  Query,
  Mutation: {
    ...cities,
    ...auth,
    ...tests,
    ...schools,
    ...olympiads,
    ...questions,
  },
  AuthPayload,
};
