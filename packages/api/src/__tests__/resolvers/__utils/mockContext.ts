import { OliContext } from '@olimat/api/utils';

// Mock dependency in jest with typescript:
// https://stackoverflow.com/questions/48759035
const createMockContext = jest.fn<OliContext, []>(() => ({
  // @ts-ignore
  prisma: {
    question: jest.fn(),
    exam: jest.fn(),
  },
  // @ts-ignore
  req: {},
  config: {},
}));

export default createMockContext();
