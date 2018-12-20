import resolvers from '../../resolvers';

const mockContext = {
  db: {
    test: jest.fn(),
  },
};
const mockTest = { id: 'tId1' };

describe('[Test.author]', () => {
  test('uses test id from parent to lookup author', async () => {
    const mockAuthor = { id: 'aId1' };
    // o prisma client usa métodos encadeados pra buscar relações
    mockContext.db.test.mockReturnValueOnce({
      author: () => mockAuthor,
    });

    // confere a resposta do resolver
    const res = await resolvers.Test.author(mockTest, null, mockContext);
    expect(res).toEqual(mockAuthor);

    // verifica se o Prisma Client foi chamado corretamente
    expect(mockContext.db.test).toBeCalledWith(mockTest);
  });
});

describe('[Test.questions]', () => {
  test('uses test id from parent to lookup questions', async () => {
    const mockQuestions = [{ id: 'qId1', wording: 'Questão 1' }];
    mockContext.db.test.mockReturnValueOnce({
      questions: () => mockQuestions,
    });

    const res = await resolvers.Test.questions(mockTest, null, mockContext);
    expect(res).toEqual(mockQuestions);

    expect(mockContext.db.test).toBeCalledWith(mockTest);
  });

  test('returns empty array if no response', async () => {
    mockContext.db.test.mockReturnValueOnce({
      questions: () => [],
    });

    const res = await resolvers.Test.questions(mockTest, null, mockContext);
    expect(res).toEqual([]);
  });
});
