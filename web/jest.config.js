// Common options should be extracted to monorepo's root: jest.workspace.js
// const rootConfig = require('../jest.workspace.js');

// No need to specify 'transformer', Jest v24 uses babel-jest by default
// https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly
module.exports = {
  displayName: 'Web',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
