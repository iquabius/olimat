import { cities } from './cities';
import { auth } from './auth';
import { tests } from './tests';
import { schools } from './schools';
import { olympiads } from './olympiads';
import { questions } from './questions';

export const Mutation = {
  ...cities,
  ...auth,
  ...tests,
  ...schools,
  ...olympiads,
  ...questions,
};
