import { getUserId, Context } from '../../utils';

export const olympiads = {
  async createOlympiad(_, { name, year }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const newOlympiad = await ctx.db.createOlympiad({
      name,
      year,
      createdBy: {
        connect: { id: userId },
      },
    });
    // createOlympiad() only returns scalar fields
    return {
      ...newOlympiad,
      createdBy: ctx.db.olympiad({ id: newOlympiad.id }).createdBy(),
    };
  },

  async deleteOlympiad(_, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const olympiadExists = await ctx.db.$exists.olympiad({
      id,
      createdBy: { id: userId },
    });
    if (!olympiadExists) {
      throw new Error(`Olympiad not found or you're not authorized`);
    }

    return ctx.db.deleteOlympiad({ id });
  },
};
