import { SchoolResolvers } from '../__generated__/resolvers-types';

export const School: SchoolResolvers.Resolvers = {
	city(parent, _, { prisma }) {
		return prisma.school({ id: parent.id }).city();
	},
	olympiadCood(parent, _, { prisma }) {
		return prisma.school({ id: parent.id }).olympiadCood();
	},
};
