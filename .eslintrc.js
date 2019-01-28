module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    // Disable all rules related to code formatting. Prettier handles formatting.
    // Prettier related configs should come last in the 'extends' Array.
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    // The code base was migrated from JavaScript recently. Let's chill a bit.
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
