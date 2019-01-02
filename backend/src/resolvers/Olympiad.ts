export const Olympiad = {
  createdBy(parent, _, { prisma }) {
    return prisma.olympiad({ id: parent.id }).createdBy();
  },
};
