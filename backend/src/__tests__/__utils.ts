import { ApolloServer } from 'apollo-server-express';
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
    resolvers,
    context,
  });

  return server;
};
