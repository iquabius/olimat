const withCSS = require('@zeit/next-css');

// Use next-compose-plugins if this gets weird
module.exports = withCSS({
  distDir: '../.next', // this is next's config, not next-css'
});
