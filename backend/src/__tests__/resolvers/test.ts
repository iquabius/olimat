import resolvers from '../../resolvers';
import { Test } from '../../__generated__/prisma-client';
import mockContext from './__utils/mockContext';

const mockTest: Test = { id: 'tId1', title: 'Prova 1', createdAt: '', updatedAt: '' };

describe('[Test.author]', () => {
  test('uses test id from parent to lookup author', async () => {
    const mockAuthor = { id: 'aId1' };
    // o prisma client usa métodos encadeados pra buscar relações
    mockContext.prisma.test.mockReturnValueOnce({
      author: () => mockAuthor,
    });

    // confere a resposta do resolver
    const res = await resolvers.Test.author(mockTest, null, mockContext, null);
    expect(res).toEqual(mockAuthor);

    // verifica se o Prisma Client foi chamado corretamente
    expect(mockContext.prisma.test).toBeCalledWith({ id: mockTest.id });
  });
});

describe('[Test.questions]', () => {
  test('uses test id from parent to lookup questions', async () => {
    const mockQuestions = [{ id: 'qId1', wording: 'Questão 1' }];
    mockContext.prisma.test.mockReturnValueOnce({
      questions: () => mockQuestions,
    });

    const res = await resolvers.Test.questions(mockTest, null, mockContext, null);
    expect(res).toEqual(mockQuestions);

    expect(mockContext.prisma.test).toBeCalledWith({ id: mockTest.id });
  });

  test('returns empty array if no response', async () => {
    mockContext.prisma.test.mockReturnValueOnce({
      questions: () => [],
    });

    const res = await resolvers.Test.questions(mockTest, null, mockContext, null);
    expect(res).toEqual([]);
  });
});
