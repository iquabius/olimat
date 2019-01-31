module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Disable all rules related to code formatting. Prettier handles formatting.
    // Prettier related configs should come last in the 'extends' Array.
    'plugin:import/recommended',
    // We could move the import/* settings below to a lerna package, and use it here:
    // 'plugin:typescript-eslint-import/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'no-param-reassign': ['error'],

    // The code base was migrated from JavaScript recently. Let's chill a bit.
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    // This is not working well with JSX
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    // eslint-plugin-import
    // We can't alphabetize imports within groups, yet
    // https://github.com/benmosher/eslint-plugin-import/pull/1105
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Allow imports from devDependencies
        devDependencies: [
          // In test files
          '**/*.test.{ts,tsx}',
          '**/*/__tests__/**/*.{ts,tsx}',
          // In test utilities files
          '**/*/utils/test/*.{ts,tsx}',
          // In configuration or setup files
          '**/*.{config,setup}.{js,ts}',
        ],
      },
    ],
    'import/order': ['error'],
  },
  settings: {
    'import/extensions': ['.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    // https://www.npmjs.com/package/eslint-import-resolver-typescript#configuration
    'import/resolver': {
      typescript: {},
    },
  },
};
