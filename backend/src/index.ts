import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import * as path from 'path';
import { importSchema } from 'graphql-import';
import { prisma } from './__generated__/prisma-client';
import resolvers from './resolvers';
import { handleGET, handlePost } from './filepond';

// TODO: Move appConfig to a config file
export const appConfig = {
  uploads: {
    server: 'http://localhost:4000',
    // The 'files' directory should be a docker volume,
    // maybe in a dedicated container
    basePath: 'files',
    tempDir: path.join(__dirname, '..', 'files', 'tmp'),
    publicDir: path.join(__dirname, '..', 'files', 'public'),
  },
};

export const typeDefs = gql(importSchema('src/schema.graphql'));

export const context = ({ req, res }) => ({ appConfig, prisma, req });

export const server = new ApolloServer({ context, resolvers, typeDefs });

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
app.use('/files', express.static(appConfig.uploads.publicDir));

// Inicia o servidor se não estivermos no ambiente de testes.
// Se estivermos no ambiente de teste, o servidor é iniciado
// manualmente nos testes (e2e no caso).
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
}
