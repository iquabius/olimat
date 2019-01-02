import { getUserId, Context } from '../utils';
// Esse tipo é gerado pelo 'graphql codegen'
// import { OlympiadConnection } from '../__generated__/prisma';

// O primeiro argumento dos resolvers, 'parent', sempre será
// 'blank' porque ele se refere à raíz do grafo.
export const Query = {
  // https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
  node(_, { id }, ctx: Context, info) {
    return ctx.prisma.node({ id });
  },

  city(_, { id }, ctx: Context, info) {
    return ctx.prisma.city({ id });
  },

  cities(_, args, ctx: Context, info) {
    return ctx.prisma.cities({});
  },

  olympiad(_, { id }, ctx: Context, info) {
    return ctx.prisma.olympiad({ id });
  },

  async olympiads(_, args, ctx: Context, info) {
    const olympiads = await ctx.prisma.olympiads({});
    return olympiads.map(o => ({
      ...o,
      createdBy: ctx.prisma.olympiad({ id: o.id }).createdBy(),
    }));
  },

  olympiadsFeed(_, { first, after }, ctx: Context, info) {
    // As xsConnections do Prisma Client foram concertadas na versão 1.23.0
    return ctx.prisma.olympiadsConnection({ first, after });
  },

  async question(_, { id }, ctx: Context) {
    const question = await ctx.prisma.question({ id });
    return question;
  },

  async questions(_, args, ctx: Context) {
    const questions = await ctx.prisma.questions({});
    return questions;
  },

  questionsConnection(_, args, ctx: Context, info) {
    return ctx.prisma.questionsConnection(args);
  },

  async schools(_, args, ctx: Context, info) {
    const schools = await ctx.prisma.schools({});
    return schools;
  },

  school(_, { id }, ctx: Context, info) {
    return ctx.prisma.school({ id });
  },

  tests(_, args, ctx: Context, info) {
    return ctx.prisma.tests({});
  },

  test(_, { id }, ctx: Context, info) {
    return ctx.prisma.test({ id });
  },

  me(_, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.prisma.user({ id });
  },
};
