// Common options should be extracted to monorepo's root: jest.workspace.js
// const rootConfig = require('../jest.workspace.js');
module.exports = {
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.ts'),
  transform: {
    '\\.(ts|tsx)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
};
