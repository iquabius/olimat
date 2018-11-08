import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
const express = require('express');

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
  }),
});

// The 'files' directory should be a docker volume, maybe in a dedicated container
server.express.use('/files', express.static('files'));

server.start(() => console.log('Server is running on http://localhost:4000'));
