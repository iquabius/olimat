// https://github.com/prisma/prisma/issues/2225#issuecomment-413265367
export const Node = {
  __resolveType(obj, ctx, info) {
    return obj.__typename;
  },
};
