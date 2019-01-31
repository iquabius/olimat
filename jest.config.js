// This configuration is used to run tests from monorepo's root directory,
// using Jest's Multi-Project-Runner.

module.exports = {
  // Jest tries to load 'packages/tsconfig.json', this prevents it.
  projects: ['<rootDir>/packages/*/jest.config.js'],
  // coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/build/**'],
  coverageDirectory: 'coverage',
};
