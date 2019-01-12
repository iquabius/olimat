import { OliContext } from '../../../utils';

// Mock dependency in jest with typescript:
// https://stackoverflow.com/questions/48759035
const createMockContext = jest.fn<OliContext>(() => ({
  prisma: {
    question: jest.fn(),
    test: jest.fn(),
  },
  req: {},
  config: {},
}));

export default createMockContext();
