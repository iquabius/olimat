import { MutationResolvers } from '../../__generated__/resolvers-types';

import { auth } from './auth';
import { cities } from './cities';
import { olympiads } from './olympiads';
import { questions } from './questions';
import { schools } from './schools';
import { tests } from './tests';

export const Mutation: MutationResolvers.Resolvers = {
  ...cities,
  ...auth,
  ...tests,
  ...schools,
  ...olympiads,
  ...questions,
};
