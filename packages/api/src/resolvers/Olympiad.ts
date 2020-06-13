import { OlympiadResolvers } from '../__generated__/resolvers-types';

export const Olympiad: OlympiadResolvers.Resolvers = {
	createdBy(parent, _, { prisma }) {
		return prisma.olympiad({ id: parent.id }).createdBy();
	},
};
