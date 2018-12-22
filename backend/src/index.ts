import { ApolloServer, gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { prisma } from './__generated__/prisma-client';
import resolvers from './resolvers';
import * as path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { handleGET, handlePost } from './filepond';
import express from 'express';

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

export const context = ({ req, res }) => ({
  req,
  prisma,
  appConfig,
});

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

const app = express();
server.applyMiddleware({ app });
app.use(cors({ origin: '*' }));

app.use('/files', express.static(appConfig.uploads.publicDir));

app.use(fileUpload());

app.post('/upload', handlePost);

app.get('/upload', handleGET);

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
}
