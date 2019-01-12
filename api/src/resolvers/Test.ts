import { TestResolvers } from '../__generated__/resolvers-types';

// Isto é necessário porque o cliente Prisma só busca o valores 'escalares',
// mas não as 'relações'. O campo 'questions' não é buscado pelo cliente
// quando invocamos os métodos 'test' or 'tests', como é feito nos resolvers
// 'test' ou 'tests', respectivamente (veja Query.ts).
// https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-implementing-relations-with-prisma-client
export const Test: TestResolvers.Resolvers = {
  /**
   * Busca o usuário que criou a prova.
   * @param parent instância da prova (Test)
   */
  author(parent, _, { prisma }) {
    return prisma.test({ id: parent.id }).author();
  },
  /**
   * Busca as questões relacionadas a uma prova.
   * @param parent instância da prova (Test)
   */
  questions(parent, _, { prisma }) {
    return prisma.test({ id: parent.id }).questions();
  },
};
