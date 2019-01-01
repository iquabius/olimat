import { getUserId } from '../../utils';
import { MutationResolvers } from '../../__generated__/graphqlgen';

interface TestsMutationResolvers {
  createTest: MutationResolvers.CreateTestResolver;
  deleteTest: MutationResolvers.DeleteTestResolver;
}

export const tests: TestsMutationResolvers = {
  async createTest(_, { title, description }, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createTest({
      title,
      description,
      author: {
        connect: { id: userId },
      },
    });
  },

  async deleteTest(_, { id }, ctx, info) {
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
