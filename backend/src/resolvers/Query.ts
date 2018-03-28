import { getUserId, Context } from '../utils';
import { OlympiadConnection } from '../generated/prisma';

export const Query = {
  olympiad(parent, { id }, ctx: Context, info) {
    return ctx.db.query.olympiad({ where: { id } }, info);
  },

  olympiads(parent, args, ctx: Context, info) {
    return ctx.db.query.olympiads({}, info);
  },

  olympiadsFeed(parent, { first, after }, ctx: Context, info) {
    return ctx.db.query.olympiadsConnection({ first, after }, info);
  },

  schools(parent, args, ctx: Context, info) {
    return ctx.db.query.schools({}, info);
  },

  school(parent, { id }, ctx: Context, info) {
    return ctx.db.query.school({ where: { id } }, info);
  },

  tests(parent, args, ctx: Context, info) {
    return ctx.db.query.tests({}, info);
  },

  test(parent, { id }, ctx: Context, info) {
    return ctx.db.query.test({ where: { id } }, info);
  },

  me(parent, args, ctx: Context, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};
