import { getUserId, Context } from '../../utils';

export const tests = {
  async createTest(_, { title, description }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createTest({
      title,
      description,
      author: {
        connect: { id: userId },
      },
    });
  },

  async deleteTest(_, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const testExists = await ctx.prisma.$exists.test({
      id,
      author: { id: userId },
    });
    if (!testExists) {
      throw new Error(`Test not found or you're not the author`);
    }

    return ctx.prisma.deleteTest({ id });
  },
};
