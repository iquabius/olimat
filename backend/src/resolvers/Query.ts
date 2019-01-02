import { getUserId } from '../utils';
// Esse tipo é gerado pelo 'graphql codegen'
// import { OlympiadConnection } from '../__generated__/prisma';

// O primeiro argumento dos resolvers, 'parent', sempre será
// 'blank' porque ele se refere à raíz do grafo.
export const Query = {
  // https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
  // O 'prisma generate' gera um tipo inconpatível, a interface Node está vazia,
  // e é usado como retorno do resolver 'node'.
  // No entanto, ele gera o NodeNode com o 'id', que não é usado em lugar nenhum.
  // node(_, { id }, ctx, info) {
  //   return ctx.prisma.node({ id });
  // },

  city(_, { id }, ctx, info) {
    return ctx.prisma.city({ id });
  },

  cities(_, args, ctx, info) {
    return ctx.prisma.cities({});
  },

  olympiad(_, { id }, ctx, info) {
    return ctx.prisma.olympiad({ id });
  },

  async olympiads(_, args, ctx, info) {
    const olympiads = await ctx.prisma.olympiads({});
    return olympiads;
  },

  olympiadsConnection(_, { first, after }, ctx, info) {
    // As xsConnections do Prisma Client foram concertadas na versão 1.23.0
    return ctx.prisma.olympiadsConnection({ first, after });
  },

  async question(_, { id }, ctx) {
    const question = await ctx.prisma.question({ id });
    return question;
  },

  async questions(_, args, ctx) {
    const questions = await ctx.prisma.questions({});
    return questions;
  },

  questionsConnection(_, args, ctx, info) {
    return ctx.prisma.questionsConnection(args);
  },

  async schools(_, args, ctx, info) {
    const schools = await ctx.prisma.schools({});
    return schools;
  },

  school(_, { id }, ctx, info) {
    return ctx.prisma.school({ id });
  },

  tests(_, args, ctx, info) {
    return ctx.prisma.tests({});
  },

  test(_, { id }, ctx, info) {
    return ctx.prisma.test({ id });
  },

  me(_, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },
};
