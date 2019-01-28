module.exports = {
  displayName: 'API',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  transform: {
    '\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ['dist', '/node_modules/', '/__utils'],
};
