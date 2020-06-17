/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { ANALYZE } = process.env;

// Use next-compose-plugins if this gets weird
module.exports = {
	webpack: (config, { isServer }) => {
		if (ANALYZE) {
			const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

			config.plugins.push(
				new BundleAnalyzerPlugin({
					analyzerMode: 'server',
					analyzerPort: isServer ? 8888 : 8889,
					openAnalyzer: true,
				}),
			);
		}

		config.resolve.alias['@olimat/web'] = path.join(__dirname, 'src');

		return config;
	},
};
