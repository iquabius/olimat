import { AddressInfo } from 'net';
import { execute, toPromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
// @types/node-fetch possui tipo incompatível com o HttpLink,
// por isso não foi instalado.
import fetch from 'node-fetch';

import { context as defaultContext, typeDefs } from '..';
import resolvers from '../resolvers';

// Integration testing utils --------------------------------------------------

/**
 * Cria uma instância do ApolloServer, reutilizando _context_, _resolvers_,
 * e _typeDefs_ existentes. O _context_ pode ser substituído.
 * @param context O contexto a ser usado
 */
export const createTestServer = (context = defaultContext) => {
	const server = new ApolloServer({
		typeDefs,
		resolvers: resolvers as any,
		context,
	});

	return server;
};

// e2e Testing Utils ----------------------------------------------------------

export { toPromise };

export const startTestServer = async (server: ApolloServer) => {
	// if using apollo-server-express...
	const app = express();
	server.applyMiddleware({ app });
	const httpServer = await app.listen(0);

	const { port } = httpServer.address() as AddressInfo;
	const uri = `http://localhost:${port}${server.graphqlPath}`;

	// apollo-server
	// const httpServer = await server.listen({ port: 0 });

	const link = new HttpLink({
		uri,
		fetch,
	});

	const executeOperation = ({ query, variables = {} }) => execute(link, { query, variables });

	return {
		link,
		// stop: () => httpServer.server.close(), // apollo-server
		stop: () => httpServer.close(), // apollo-server-express
		graphql: executeOperation,
	};
};
