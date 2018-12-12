module.exports = {
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
