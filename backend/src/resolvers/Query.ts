import { getUserId, Context } from '../utils';

export const Query = {
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
