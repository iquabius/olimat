const { getUserId, Context } = require('../../utils')

const tests = {
  async createTest(parent, { title, description }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createTest(
      {
        data: {
          title,
          description,
          author: {
            connect: { id: userId },
          },
        },
      },
      info
    )
  },

  async deleteTest(parent, { id }, ctx, info) {
    const userId = getUserId(ctx)
    const testExists = await ctx.db.exists.Test({
      id,
      author: { id: userId },
    })
    if (!testExists) {
      throw new Error(`Test not found or you're not the author`)
    }

    return ctx.db.mutation.deleteTest({ where: { id } })
  },
}

module.exports = { tests }
