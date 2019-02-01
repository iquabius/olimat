// No need to specify 'transformer', Jest v24 uses babel-jest by default
// https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly
module.exports = {
  displayName: 'Web',
  moduleNameMapper: {
    '\\@olimat/api/(.*)': '<rootDir>/../api/dist/$1',
    '\\@olimat/web/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
