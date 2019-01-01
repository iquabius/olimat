import { OlympiadResolvers } from '../__generated__/graphqlgen';

export const Olympiad: OlympiadResolvers.Type = {
  ...OlympiadResolvers.defaultResolvers,
  createdBy(parent, _, { prisma }) {
    return prisma.olympiad({ id: parent.id }).createdBy();
  },
};
