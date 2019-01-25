module.exports = {
  displayName: 'API',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['dist', '/node_modules/', '/__utils'],
  moduleFileExtensions: ['ts', 'js'],
  // collectCoverage: true,
};
