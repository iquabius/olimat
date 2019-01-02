export const User = {
  tests(parent, _, { prisma }) {
    return prisma.user({ id: parent.id }).tests();
  },
};
