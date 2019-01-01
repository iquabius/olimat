import { MutationResolvers } from '../../__generated__/graphqlgen';

interface CitiesMutationResolvers {
  createCity: MutationResolvers.CreateCityResolver;
  deleteCity: MutationResolvers.DeleteCityResolver;
  updateCity: MutationResolvers.UpdateCityResolver;
}

export const cities: CitiesMutationResolvers = {
  createCity(_, { name }, ctx, info) {
    return ctx.prisma.createCity({ name });
  },

  async deleteCity(_, { id }, ctx, info) {
    const cityExists = await ctx.prisma.$exists.city({ id });
    if (!cityExists) {
      throw new Error(`City not found or you're not authorized`);
    }

    return ctx.prisma.deleteCity({ id });
  },

  updateCity(_, { id, name }, ctx, info) {
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
