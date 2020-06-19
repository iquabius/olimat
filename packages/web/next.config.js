/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

// Use next-compose-plugins if this gets weird
module.exports = withBundleAnalyzer({
	webpack: config => {
		config.resolve.alias['@olimat/web'] = path.join(__dirname, 'src');

		return config;
	},
});
