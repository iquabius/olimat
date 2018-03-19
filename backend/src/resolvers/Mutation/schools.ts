import { getUserId, Context } from '../../utils';

export const schools = {
  async createSchool(
    parent,
    { name, email, phone, pedagogicalCoordinator, director, city, address },
    ctx: Context,
    info,
  ) {
    const userId = getUserId(ctx);
    return ctx.db.mutation.createSchool(
      {
        data: {
          name,
          email,
          phone,
          olympiadCoordinator: {
            connect: { id: userId },
          },
          pedagogicalCoordinator,
          director,
          city: { connect: { name: city } },
          address,
        },
      },
      info,
    );
  },

  async deleteSchool(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const schoolExists = await ctx.db.exists.School({
      id,
      olympiadCoordinator: { id: userId },
    });
    if (!schoolExists) {
      throw new Error(`School not found or you're not authorized`);
    }

    return ctx.db.mutation.deleteSchool({ where: { id } });
  },
};
