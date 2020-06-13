import { Exam } from '@olimat/api/__generated__/prisma-client';
import resolvers from '@olimat/api/resolvers';

import mockContext from './__utils/mockContext';

const mockExam: Exam = {
	id: 'eId1',
	title: 'Prova 1',
	createdAt: '',
	updatedAt: '',
};

describe('[Exam.author]', () => {
	test('uses exam id from parent to lookup author', async () => {
		const mockAuthor = { id: 'aId1' };
		// o prisma client usa métodos encadeados pra buscar relações
		mockContext.prisma.exam.mockReturnValueOnce({
			author: () => mockAuthor,
		});

		// confere a resposta do resolver
		const res = await resolvers.Exam.author(mockExam, null, mockContext, null);
		expect(res).toEqual(mockAuthor);

		// verifica se o Prisma Client foi chamado corretamente
		expect(mockContext.prisma.exam).toBeCalledWith({ id: mockExam.id });
	});
});

describe('[Exam.questions]', () => {
	test('uses exam id from parent to lookup questions', async () => {
		const mockQuestions = [{ id: 'qId1', wording: 'Questão 1' }];
		mockContext.prisma.exam.mockReturnValueOnce({
			questions: () => mockQuestions,
		});

		const res = await resolvers.Exam.questions(
			mockExam,
			null,
			mockContext,
			null,
		);
		expect(res).toEqual(mockQuestions);

		expect(mockContext.prisma.exam).toBeCalledWith({ id: mockExam.id });
	});

	test('returns empty array if no response', async () => {
		mockContext.prisma.exam.mockReturnValueOnce({
			questions: () => [],
		});

		const res = await resolvers.Exam.questions(
			mockExam,
			null,
			mockContext,
			null,
		);
		expect(res).toEqual([]);
	});
});
