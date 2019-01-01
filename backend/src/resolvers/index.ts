import { Olympiad } from './Olympiad';
import { Query } from './Query';
import { AuthPayload } from './AuthPayload';
import { Test } from './Test';
import { Question } from './Question';
import { School } from './School';
import { Mutation } from './Mutation';
import { User } from './User';

export const resolvers = {
  Olympiad,
  Query,
  Test,
  Question,
  // https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
  Node: {
    __resolveType(obj, ctx, info) {
      return obj.__typename;
    },
  },
  Mutation,
  AuthPayload,
  School,
  User,
};
