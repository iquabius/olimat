// VS Code extension doesn't work for monorepos like this.
// The autocomplete feature only works if we open the 'frontend'
// directory as root.
// https://github.com/apollographql/apollo-tooling/issues/802
// https://github.com/apollographql/apollo-tooling/issues/685
// Another alternative is to use VS Code Multi-root workspaces.
module.exports = {
  client: {
    name: 'OliMAT [web]',
    service: 'olimat@alpha',
  },
};
