import { cities } from './cities';
import { auth } from './auth';
import { tests } from './tests';
import { schools } from './schools';
import { olympiads } from './olympiads';
import { questions } from './questions';
import { MutationResolvers } from '../../__generated__/graphqlgen';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  ...cities,
  ...auth,
  ...tests,
  ...schools,
  ...olympiads,
  ...questions,
};
