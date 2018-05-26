import { getUserId, Context } from '../../utils';

export const olympiads = {
  async createOlympiad(parent, { name, year }, ctx: Context, info) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createOlympiad(
      {
        data: {
          name,
          year,
          createdBy: {
            connect: { id: userId },
          },
        },
      },
      info,
    );
  },

  async deleteOlympiad(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const olympiadExists = await ctx.db.exists.Olympiad({
      id,
      createdBy: { id: userId },
    });
    if (!olympiadExists) {
      throw new Error(`Olympiad not found or you're not authorized`);
    }

    return ctx.db.mutation.deleteOlympiad({ where: { id } });
  },
};
