import { getUserId, Context } from '../../utils';

export const olympiads = {
  async createOlympiad(_, { name, year }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const newOlympiad = await ctx.prisma.createOlympiad({
      name,
      year,
      createdBy: {
        connect: { id: userId },
      },
    });
    return newOlympiad;
  },

  async deleteOlympiad(_, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const olympiadExists = await ctx.prisma.$exists.olympiad({
      id,
      createdBy: { id: userId },
    });
    if (!olympiadExists) {
      throw new Error(`Olympiad not found or you're not authorized`);
    }

    return ctx.prisma.deleteOlympiad({ id });
  },
};
