import { UserResolvers } from '../__generated__/resolvers-types';

export const User: UserResolvers.Resolvers = {
	exams(parent, _, { prisma }) {
		return prisma.user({ id: parent.id }).exams();
	},
};
