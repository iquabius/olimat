import { ApolloServer, gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
const express = require('express');

const typeDefs = gql(importSchema('src/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
  }),
});

// The 'files' directory should be a docker volume, maybe in a dedicated container
const app = new express();
app.use('/files', express.static('files'));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
