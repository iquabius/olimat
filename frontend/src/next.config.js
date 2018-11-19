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
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 120 * 1e3, // default 25s
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 3, // default 2
  },
});
