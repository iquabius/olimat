import { AuthPayloadResolvers } from '../__generated__/graphqlgen';

export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,
  user: async ({ user: { id } }, args, ctx, info) => {
    return ctx.prisma.user({ id });
  },
};
