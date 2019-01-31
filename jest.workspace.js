module.exports = {
  // ts-jest has a helper that can be used for this:
  // https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
  moduleNameMapper: {
    '\\@olimat/(.*)/(.*)': '<rootDir>/../$1/dist/$2',
  },
};
