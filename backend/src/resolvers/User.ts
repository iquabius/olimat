import { UserResolvers } from '../__generated__/graphqlgen';

export const User: UserResolvers.Type = {
  ...UserResolvers.defaultResolvers,
  tests(parent, _, { prisma }) {
    return prisma.user({ id: parent.id }).tests();
  },
};
