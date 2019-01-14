import { pageToTitle } from './helpers';

describe('pageToTitle', () => {
  test('returns own title property if it exists', () => {
    const page = {
      title: 'OliMAT',
    };
    expect(pageToTitle(page)).toBe('OliMAT');
  });
});
