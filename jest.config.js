// This configuration is used to run tests from monorepo's root directory,
// using Jest's Multi-Project-Runner.
// This currently doesn't work for api integrations tests, try running
// 'npx jest' at the root.

module.exports = {
  projects: ['<rootDir>/api', '<rootDir>/web'],
  transform: {
    '\\.(ts|tsx)$': 'babel-jest',
  },
  // coverageReporters: ['text', 'lcov'],
  // collectCoverageFrom: ['src/**/*.ts'],
  // coverageDirectory: 'coverage',
};
