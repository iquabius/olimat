import express from 'express';
import jwt from 'jsonwebtoken';

import { Prisma } from './__generated__/prisma-client';

// Tem que ser um nome diferente de 'Context', porque o graphql-code-generator
// usa esse nome internamente.
export interface OliContext {
	prisma: Prisma;
	req: express.Request;
	config: any;
}

export function getUserId(ctx: OliContext) {
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
