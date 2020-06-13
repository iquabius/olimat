import { ExamResolvers } from '../__generated__/resolvers-types';

// Isto é necessário porque o cliente Prisma só busca o valores 'escalares',
// mas não as 'relações'. O campo 'questions' não é buscado pelo cliente
// quando invocamos os métodos 'exam' or 'exams', como é feito nos resolvers
// 'exam' ou 'exams', respectivamente (veja Query.ts).
// https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/#scenario:-implementing-relations-with-prisma-client
export const Exam: ExamResolvers.Resolvers = {
	/**
	 * Busca o usuário que criou a prova.
	 * @param parent instância da prova (Exam)
	 */
	author(parent, _, { prisma }) {
		return prisma.exam({ id: parent.id }).author();
	},
	/**
	 * Busca as questões relacionadas a uma prova.
	 * @param parent instância da prova (Exam)
	 */
	questions(parent, _, { prisma }) {
		return prisma.exam({ id: parent.id }).questions();
	},
};
