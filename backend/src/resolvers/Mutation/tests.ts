import { getUserId, Context } from '../../utils';

export const tests = {
  async createTest(parent, { title, description }, ctx: Context, info) {
    const userId = getUserId(ctx);
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
      info,
    );
  },

  async deleteTest(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const testExists = await ctx.db.exists.Test({
      id,
      author: { id: userId },
    });
    if (!testExists) {
      throw new Error(`Test not found or you're not the author`);
    }

    return ctx.db.mutation.deleteTest({ where: { id } });
  },
};
