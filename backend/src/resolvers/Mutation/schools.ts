import { getUserId, Context } from '../../utils';

export const schools = {
  async createSchool(
    _,
    { name, email, phone, pedagogyCoord, director, city, address },
    ctx: Context,
    info,
  ) {
    const userId = getUserId(ctx);
    const newSchool = await ctx.prisma.createSchool({
      name,
      email,
      phone,
      olympiadCood: {
        connect: { id: userId },
      },
      pedagogyCoord,
      director,
      city: { connect: { name: city } },
      address,
    });
    // createSchool() only returns scalar fields
    return {
      ...newSchool,
      city: ctx.prisma.school({ id: newSchool.id }).city(),
    };
  },

  async deleteSchool(_, { id }, ctx: Context, info) {
    const userId = getUserId(ctx);
    const schoolExists = await ctx.prisma.$exists.school({
      id,
      olympiadCood: { id: userId },
    });
    if (!schoolExists) {
      throw new Error(`School not found or you're not authorized`);
    }

    return ctx.prisma.deleteSchool({ id });
  },
};
