/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const baseConfig = require('../../jest.workspace');

// No need to specify 'transformer', Jest v24 uses babel-jest by default
// https://jestjs.io/blog/2019/01/25/jest-24-refreshing-polished-typescript-friendly
module.exports = {
  ...baseConfig,
  displayName: 'Web',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
