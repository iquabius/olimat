module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.(ts|js)$',
  testPathIgnorePatterns: ['/node_modules/', '/__utils'],
  moduleFileExtensions: ['ts', 'js'],
  // collectCoverage: true,
};
