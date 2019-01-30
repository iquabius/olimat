// This configuration is used to run tests from monorepo's root directory,
// using Jest's Multi-Project-Runner.

module.exports = {
  projects: ['<rootDir>/packages/*'],
  // coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/build/**'],
  coverageDirectory: 'coverage',
};
