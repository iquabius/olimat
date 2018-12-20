module.exports = {
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.(ts|js)$',
  testPathIgnorePatterns: ['/lib/', '/node_modules/'],
  moduleFileExtensions: ['ts', 'js'],
  // collectCoverage: true,
};
