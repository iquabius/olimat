module.exports = {
  rules: {
    // It seems eslint-import-resolver-typescript isn't properly handling the
    // 'paths' defined in packages/api/tsconfig.json, so we need to ignore any
    // custom path we define there.
    'import/no-unresolved': ['error', { ignore: ['^@olimat/api']}],
  }
}
