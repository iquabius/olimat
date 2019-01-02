export const School = {
  city(parent, _, { prisma }) {
    return prisma.school({ id: parent.id }).city();
  },
  olympiadCood(parent, _, { prisma }) {
    return prisma.school({ id: parent.id }).olympiadCood();
  },
};
