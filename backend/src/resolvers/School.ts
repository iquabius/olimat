import { SchoolResolvers } from '../__generated__/graphqlgen';

export const School: SchoolResolvers.Type = {
  ...SchoolResolvers.defaultResolvers,
  city(parent, _, { prisma }) {
    return prisma.school({ id: parent.id }).city();
  },
  olympiadCood(parent, _, { prisma }) {
    return prisma.school({ id: parent.id }).olympiadCood();
  },
};
