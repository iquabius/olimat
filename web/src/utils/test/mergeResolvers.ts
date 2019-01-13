// Esta função foi tirada do artigo de Sashko Stubailo:
// "A new approach to mocking GraphQL data" (Dec 11, 2018)
// https://medium.freecodecamp.org/a-new-approach-to-mocking-graphql-data-1ef49de3d491
// https://gist.github.com/hellendag/2aa9ad1f9b771f38802760c269bb1b76

/**
 * Given a map of mock GraphQL resolver functions, merge in a map of
 * desired mocks. Generally, `target` will be the default mocked values,
 * and `input` will be the values desired for a portal example or Jest tests.
 */
// TODO: Add TypeScript types
const mergeResolvers = (target, input) => {
  const inputTypenames = Object.keys(input);
  const merged = inputTypenames.reduce(
    (accum, key) => {
      const inputResolver = input[key];
      if (target.hasOwnProperty(key)) {
        const targetResolver = target[key];
        const resolvedInput = inputResolver();
        const resolvedTarget = targetResolver();
        if (
          !!resolvedTarget &&
          !!resolvedInput &&
          typeof resolvedTarget === 'object' &&
          typeof resolvedInput === 'object' &&
          !Array.isArray(resolvedTarget) &&
          !Array.isArray(resolvedInput)
        ) {
          const newValue = { ...resolvedTarget, ...resolvedInput };
          return {
            ...accum,
            [key]: () => newValue,
          };
        }
      }
      return { ...accum, [key]: inputResolver };
    },
    { ...target },
  );
  return merged;
};

export default mergeResolvers;
