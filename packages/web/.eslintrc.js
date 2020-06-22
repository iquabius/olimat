// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require('react');

module.exports = {
	extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
	rules: {
		// Enforce event handler naming conventions in JSX
		// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
		'react/jsx-handler-names': ['error'],
		// We're using TypeScript now, no need for PropTypes everywhere
		'react/prop-types': ['error', { skipUndeclared: true }],

		// It's buggy, but very interesting to have enabled
		// https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/536
		'jsx-a11y/no-static-element-interactions': ['warn'],
	},
	settings: {
		react: {
			version: React.version,
		},
	},
};
