import resolvers from '../../resolvers';

const mockContext = {
  prisma: {
    question: jest.fn(),
  },
};
const mockQuestion = { id: 'tId1' };

describe('[Question.choices]', () => {
  test('uses question id from parent to lookup choices', async () => {
    const mockChoices = [{ id: 'cId1' }];
    // o prisma client usa métodos encadeados pra buscar relações
    mockContext.prisma.question.mockReturnValueOnce({
      choices: () => mockChoices,
    });

    const res = await resolvers.Question.choices(mockQuestion, null, mockContext);
    expect(res).toEqual(mockChoices);

    expect(mockContext.prisma.question).toBeCalledWith(mockQuestion);
  });
});
