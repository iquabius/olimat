import { MutationResolvers } from '@olimat/api/__generated__/resolvers-types';

export const cities: MutationResolvers.Resolvers = {
  async createCity(_, { name }, ctx, info) {
    return ctx.prisma.createCity({ name });
  },

  async deleteCity(_, { id }, ctx, info) {
    const cityExists = await ctx.prisma.$exists.city({ id });
    if (!cityExists) {
      throw new Error(`City not found or you're not authorized`);
    }

    return ctx.prisma.deleteCity({ id });
  },

  async updateCity(_, { id, name }, ctx, info) {
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
