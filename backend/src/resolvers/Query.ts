import { getUserId, Context } from '../utils';
import { OlympiadConnection } from '../generated/prisma';

export const Query = {
  city(parent, { id }, ctx: Context, info) {
    return ctx.db.city({ id });
  },

  cities(parent, args, ctx: Context, info) {
    return ctx.db.cities({});
  },

  olympiad(parent, { id }, ctx: Context, info) {
    return ctx.db.olympiad({ id });
  },

  async olympiads(parent, args, ctx: Context, info) {
    const olympiads = await ctx.db.olympiads({});
    return olympiads.map(o => ({
      ...o,
      createdBy: ctx.db.olympiad({ id: o.id }).createdBy(),
    }));
  },

  olympiadsFeed(parent, { first, after }, ctx: Context, info) {
    return ctx.db.olympiadsConnection({ first, after });
  },

  async question(parent, { id }, ctx: Context) {
    const question = await ctx.db.question({ id });
    return {
      ...question,
      choices: await ctx.db.question({ id }).choices(),
    };
  },

  questions(parent, args, ctx: Context) {
    return ctx.db.questions({});
  },

  async schools(parent, args, ctx: Context, info) {
    // The prisma-client api is different, it only returns scalar fields
    const schools = await ctx.db.schools({});
    // Relation fields can be fetched individually...
    return schools.map(s => ({
      ...s,
      city: ctx.db.school({ id: s.id }).city(), // ...with a chained method
    }));
  },

  school(parent, { id }, ctx: Context, info) {
    return ctx.db.school({ id });
  },

  tests(parent, args, ctx: Context, info) {
    return ctx.db.tests({});
  },

  test(parent, { id }, ctx: Context, info) {
    return ctx.db.test({ id });
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.user({ id });
  },
};
