import jwt from 'jsonwebtoken';
import { Context } from './types';

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
