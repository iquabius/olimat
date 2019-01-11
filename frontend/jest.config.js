module.exports = {
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),
  testPathIgnorePatterns: ['<rootDir>/cypress/', '<rootDir>/.next/', '<rootDir>/node_modules/'],
};
