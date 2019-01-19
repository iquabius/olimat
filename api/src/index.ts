import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { importSchema } from 'graphql-import';
import path from 'path';

import { prisma } from './__generated__/prisma-client';
import config from './config';
import { handleGET, handlePost } from './filepond';
import resolvers from './resolvers';

const schemaPath = path.join(__dirname, 'schema.graphql');
export const typeDefs = gql(importSchema(schemaPath));

export const context = ({ req, res }) => ({ config, prisma, req });

export const server = new ApolloServer({
  context,
  // Why does graphql-code-generator's interface is incompatible with Apollo's?
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
