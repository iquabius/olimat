// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('../../jest.workspace');

module.exports = {
  ...baseConfig,
  displayName: 'API',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['dist', '/node_modules/', '/__utils'],
};
