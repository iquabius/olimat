import { Query } from './Query';
import { auth } from './Mutation/auth';
import { cities } from './Mutation/cities';
import { tests } from './Mutation/tests';
import { schools } from './Mutation/schools';
import { olympiads } from './Mutation/olympiads';
import { questions } from './Mutation/questions';
import { AuthPayload } from './AuthPayload';
import { prisma } from '../generated/prisma-client';

export default {
  Query,
  // Isto é necessário porque o cliente Prisma só busca o valores 'escalares',
  // mas não as 'relações'. O campo 'questions' não é buscado pelo cliente
  // quando invocamos os métodos 'test' or 'tests', como é feito nos resolvers
  // 'test' ou 'tests', respectivamente (veja Query.ts).
  // https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-implementing-relations-with-prisma-client
  Test: {
    /**
     * Busca o usuário que criou a prova.
     * @param parent instância da prova (Test)
     */
    author(parent) {
      return prisma.test({ id: parent.id }).author();
    },
    /**
     * Busca as questões relacionadas a uma prova.
     * @param parent instância da prova (Test)
     */
    questions(parent) {
      return prisma.test({ id: parent.id }).questions();
    },
  },
  Question: {
    /**
     * Busca as alternativas relacionadas a uma questão.
     * @param parent instância da questão (Question)
     */
    choices(parent) {
      return prisma.question({ id: parent.id }).choices();
    },
  },
  // https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
  Node: {
    __resolveType(obj, ctx, info) {
      return obj.__typename;
    },
  },
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
