import { MutationResolvers } from '@olimat/api/__generated__/resolvers-types';

import { auth } from './auth';
import { cities } from './cities';
import { exams } from './exams';
import { olympiads } from './olympiads';
import { questions } from './questions';
import { schools } from './schools';

export const Mutation: MutationResolvers.Resolvers = {
	...cities,
	...auth,
	...exams,
	...schools,
	...olympiads,
	...questions,
};
