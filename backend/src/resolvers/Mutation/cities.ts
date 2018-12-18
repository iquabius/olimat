import { Context } from '../../utils';

export const cities = {
  async createCity(_, { name }, ctx: Context, info) {
    return ctx.db.createCity({ name });
  },

  async deleteCity(_, { id }, ctx: Context, info) {
    const cityExists = await ctx.db.$exists.city({ id });
    if (!cityExists) {
      throw new Error(`City not found or you're not authorized`);
    }

    return ctx.db.deleteCity({ id });
  },

  async updateCity(_, { id, name }, ctx: Context, info) {
    return ctx.db.updateCity({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  },
};
