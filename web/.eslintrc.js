const React = require('react');

module.exports = {
  extends: 'plugin:react/recommended',
  rules: {
    // Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    'react/jsx-handler-names': ['error'],
    // We're using TypeScript now, no need for PropTypes everywhere
    'react/prop-types': ['error', { skipUndeclared: true }],
  },
  settings: {
    react: {
      version: React.version,
    },
  },
};
