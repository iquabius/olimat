import { UserResolvers } from '../__generated__/resolvers-types';

export const User: UserResolvers.Resolvers = {
  tests(parent, _, { prisma }) {
    return prisma.user({ id: parent.id }).tests();
  },
};
