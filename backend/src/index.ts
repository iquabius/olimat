import { ApolloServer, gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { prisma } from './generated/prisma-client';
import { Prisma as PrismaBinding } from 'prisma-binding';
import resolvers from './resolvers';
import * as path from 'path';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import { generate } from 'shortid';
import { extension } from 'mime-types';
const express = require('express');

const appConfig = {
  uploads: {
    server: 'http://localhost:4000',
    basePath: 'files',
    tempDir: path.join(__dirname, '..', 'files', 'tmp'),
    publicDir: path.join(__dirname, '..', 'files', 'public'),
  },
};

// We fallback to prisma-binding because prisma-client xsConnections doesn't work
const prismaBinding = new PrismaBinding({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma DB service (value is set in .env)
  secret: process.env.PRISMA_SECRET, // taken from database/prisma.yml (value is set in .env)
});

const typeDefs = gql(importSchema('src/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma,
    prismaBinding,
    appConfig,
  }),
});

const app = new express();
server.applyMiddleware({ app });
app.use(cors({ origin: '*' }));

// The 'files' directory should be a docker volume, maybe in a dedicated container
const UPLOAD_PATH = path.join(__dirname, '..', 'files');
app.use('/files', express.static(appConfig.uploads.publicDir));

app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  const uploadFile = req.files.imageUrl;
  // We don't need the extension here, just the ID is enough
  const fileName = generate() + '.' + extension(uploadFile.mimetype);
  console.log('FILE: ');
  console.log(uploadFile);
  uploadFile.mv(`${appConfig.uploads.tempDir}/${fileName}`, err => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(fileName);
  });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
