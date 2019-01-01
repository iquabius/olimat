import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { importSchema } from 'graphql-import';
import config from './config';
import { prisma } from './__generated__/prisma-client';
import { resolvers } from './resolvers';
import { handleGET, handlePost } from './filepond';

export const typeDefs = gql(importSchema('src/schema.graphql'));

export const context = ({ req, res }) => ({ config, prisma, req });

export const server = new ApolloServer({
  context,
  resolvers: resolvers as any,
  typeDefs,
});

// Vincula o Express ao Apollo Server
const app = express();
server.applyMiddleware({ app });

// Configura as partes necessárias para upload de arquivos
app.use(cors({ origin: '*' }));

app.use(fileUpload());

// Configura a rota para processar upload de arquivos
app.get('/upload', handleGET);
app.post('/upload', handlePost);

// Configura a rota para servir os arquivos upados
app.use('/files', express.static(config.uploads.publicDir));

// Inicia o servidor se não estivermos no ambiente de testes.
// Se estivermos no ambiente de teste, o servidor é iniciado
// manualmente nos testes (e2e no caso).
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
}
