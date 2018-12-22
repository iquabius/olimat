import { Context } from '../../utils';

export const cities = {
  async createCity(_, { name }, ctx: Context, info) {
    return ctx.prisma.createCity({ name });
  },

  async deleteCity(_, { id }, ctx: Context, info) {
    const cityExists = await ctx.prisma.$exists.city({ id });
    if (!cityExists) {
      throw new Error(`City not found or you're not authorized`);
    }

    return ctx.prisma.deleteCity({ id });
  },

  async updateCity(_, { id, name }, ctx: Context, info) {
    return ctx.prisma.updateCity({
      data: {
        name,
      },
      where: {
        id,
      },
    });
  },
};
