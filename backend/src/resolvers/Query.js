const { getUserId, Context } = require('../utils')

const Query = {
  tests(parent, args, ctx, info) {
    return ctx.db.query.tests({ }, info)
  },

  test(parent, { id }, ctx, info) {
    return ctx.db.query.test({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },
}

module.exports = { Query }
