import express from 'express';
import jwt from 'jsonwebtoken';
import { Prisma } from './__generated__/prisma-client';
import { Prisma as PrismaBinding } from 'prisma-binding';

export interface Context {
  db: Prisma;
  prismaBinding: PrismaBinding;
  req: express.Request;
  appConfig: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx.req.get('Authorization');
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
