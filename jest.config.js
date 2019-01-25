// This configuration is used to run tests from monorepo's root directory,
// using Jest's Multi-Project-Runner.

module.exports = {
  projects: ['<rootDir>/api', '<rootDir>/web'],
  // coverageReporters: ['text', 'lcov'],
  // collectCoverageFrom: ['src/**/*.ts'],
  // coverageDirectory: 'coverage',
};
