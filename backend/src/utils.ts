import * as jwt from 'jsonwebtoken';
import { Prisma } from './generated/prisma-client';
import { Prisma as PrismaBinding } from 'prisma-binding';

export interface Context {
  db: Prisma;
  prismaBinding: PrismaBinding;
  request: any;
  appConfig: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.request.get('Authorization');
  // Apollo Client sets header to the string 'null' when not logged in
  if (Authorization && Authorization !== 'null') {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET) as { userId: string };
    return userId;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}
