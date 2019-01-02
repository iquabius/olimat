import { NodeResolvers } from '../__generated__/resolvers-types';

// https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
export const Node: NodeResolvers.Resolvers = {
  __resolveType(obj, ctx, info) {
    // "Property '__typename' does not exist on type 'User | Question'."
    // Talvez a interface 'Node' deveria ter esta propriedade como opcional:
    // interface Node { id: string; __typename?: string; }
    // @ts-ignore
    return obj.__typename;
  },
};
