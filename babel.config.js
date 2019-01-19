// Babel 7's project-wide configuration
// https://babeljs.io/docs/en/config-files#project-wide-configuration

module.exports = {
  // We need to tell Babel to load .babelrc files from subpackages
  // https://babeljs.io/docs/en/config-files#subpackage-babelrc-files
  babelrcRoots: [
    '.', // Keep the monorepo root as a root
    // Also consider monorepo packages' "root" and load their .babelrc files.
    'web',
  ],
};
