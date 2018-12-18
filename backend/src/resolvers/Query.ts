import { getUserId, Context } from '../utils';
// Esse tipo é gerado pelo 'graphql codegen'
// import { OlympiadConnection } from '../__generated__/prisma';

// O primeiro argumento dos resolvers, 'parent', sempre será
// 'blank' porque ele se refere à raíz do grafo.
export const Query = {
  // https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
  node(_, { id }, ctx: Context, info) {
    return ctx.db.node({ id });
  },

  city(_, { id }, ctx: Context, info) {
    return ctx.db.city({ id });
  },

  cities(_, args, ctx: Context, info) {
    return ctx.db.cities({});
  },

  olympiad(_, { id }, ctx: Context, info) {
    return ctx.db.olympiad({ id });
  },

  async olympiads(_, args, ctx: Context, info) {
    const olympiads = await ctx.db.olympiads({});
    return olympiads.map(o => ({
      ...o,
      createdBy: ctx.db.olympiad({ id: o.id }).createdBy(),
    }));
  },

  olympiadsFeed(_, { first, after }, ctx: Context, info) {
    // Por enquanto as xsConnections do Prisma Client não funcionam
    // https://github.com/prisma/prisma/issues/3309
    return ctx.prismaBinding.query.olympiadsConnection({ first, after }, info);
  },

  async question(_, { id }, ctx: Context) {
    const question = await ctx.db.question({ id });
    return question;
  },

  async questions(_, args, ctx: Context) {
    const questions = await ctx.db.questions({});
    return questions;
  },

  questionsConnection(_, args, ctx: Context, info) {
    return ctx.prismaBinding.query.questionsConnection(args, info);
  },

  async schools(_, args, ctx: Context, info) {
    // The prisma-client api is different, it only returns scalar fields
    const schools = await ctx.db.schools({});
    // Relation fields can be fetched individually...
    return schools.map(s => ({
      ...s,
      city: ctx.db.school({ id: s.id }).city(), // ...with a chained method
    }));
  },

  school(_, { id }, ctx: Context, info) {
    return ctx.db.school({ id });
  },

  tests(_, args, ctx: Context, info) {
    return ctx.db.tests({});
  },

  test(_, { id }, ctx: Context, info) {
    return ctx.db.test({ id });
  },

  me(_, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.user({ id });
  },
};
