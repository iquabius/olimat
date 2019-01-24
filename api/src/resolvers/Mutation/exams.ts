import { MutationResolvers } from '../../__generated__/resolvers-types';
import { getUserId } from '../../utils';

export const exams: MutationResolvers.Resolvers = {
  async createExam(_, { title, description }, ctx, info) {
    const userId = getUserId(ctx);
    return ctx.prisma.createExam({
      title,
      description,
      author: {
        connect: { id: userId },
      },
    });
  },

  async deleteExam(_, { id }, ctx, info) {
    const userId = getUserId(ctx);
    const examExists = await ctx.prisma.$exists.exam({
      id,
      author: { id: userId },
    });
    if (!examExists) {
      throw new Error(`Exam not found or you're not the author`);
    }

    return ctx.prisma.deleteExam({ id });
  },
};
