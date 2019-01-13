module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    es6: true,
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  globals: {
    document: true,
    navigator: true,
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'arrow-body-style': 'off', // Not our taste?
    'consistent-this': ['error', 'self'],
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
      },
    ], // airbnb is allowing some edge cases
    'no-console': 'error', // airbnb is using warn
    'no-alert': 'error', // airbnb is using warn
    'no-param-reassign': 'off', // Not our taste?
    'no-prototype-builtins': 'off', // airbnb use error
    'object-curly-spacing': 'off', // use babel plugin rule
    'no-restricted-properties': 'off', // To remove once react-docgen support ** operator.
    'prefer-destructuring': 'off', // To remove once react-docgen support ** operator.

    // 'babel/object-curly-spacing': ['error', 'always'],

    'import/namespace': ['error', { allowComputed: true }],
    // 'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        groups: [['index', 'sibling', 'parent', 'internal', 'external', 'builtin']],
        'newlines-between': 'never',
      },
    ],

    'react/jsx-indent': 'off', // Incompatible with prettier
    'react/destructuring-assignment': 'off', // airbnb use error
    // 'react/jsx-closing-bracket-location': 'off', // Incompatible with prettier
    // 'react/jsx-wrap-multilines': 'off', // Incompatible with prettier
    // 'react/jsx-indent-props': 'off', // Incompatible with prettier
    'react/jsx-handler-names': [
      'error',
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/require-default-props': 'off', // airbnb use error
    'react/forbid-prop-types': 'off', // airbnb use error
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb is using .jsx
    'react/no-danger': 'error', // airbnb is using warn
    'react/no-direct-mutation-state': 'error', // airbnb is disabling this rule
    'react/no-unused-prop-types': 'off', // Is still buggy
    'react/sort-prop-types': 'error', // airbnb do nothing here.
    'react/default-props-match-prop-types': 'off', // Buggy
    'react/jsx-curly-brace-presence': 'off', // Buggy
  },
};
