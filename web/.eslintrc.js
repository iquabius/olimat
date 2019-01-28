const React = require('react');

module.exports = {
  extends: 'plugin:react/recommended',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // We're using TypeScript now, no need for PropTypes everywhere
    'react/prop-types': ['error', { skipUndeclared: true }],
  },
  settings: {
    react: {
      version: React.version,
    },
  },
};
