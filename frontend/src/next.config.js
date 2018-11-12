const withCSS = require('@zeit/next-css');

const { ANALYZE } = process.env;

// Use next-compose-plugins if this gets weird
module.exports = withCSS({
  distDir: '../.next', // this is next's config, not next-css'
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

    return config;
  },
});
