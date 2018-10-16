import { Context } from '../../utils';

export const cities = {
  async createCity(parent, { name }, ctx: Context, info) {
    return ctx.db.mutation.createCity(
      {
        data: {
          name,
        },
      },
      info,
    );
  },

  async deleteCity(parent, { id }, ctx: Context, info) {
    const cityExists = await ctx.db.exists.City({
      id,
    });
    if (!cityExists) {
      throw new Error(`City not found or you're not authorized`);
    }

    return ctx.db.mutation.deleteCity({ where: { id } });
  },
};
