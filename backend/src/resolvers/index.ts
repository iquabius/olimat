import { Query } from './Query';
import { auth } from './Mutation/auth';
import { cities } from './Mutation/cities';
import { tests } from './Mutation/tests';
import { schools } from './Mutation/schools';
import { olympiads } from './Mutation/olympiads';
import { questions } from './Mutation/questions';
import { AuthPayload } from './AuthPayload';
import { Node } from './Node';
import { Question } from './Question';
import { Test } from './Test';

export default {
  Query,
  Test,
  Question,
  Node,
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
