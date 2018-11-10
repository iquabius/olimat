import { ApolloServer, gql } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import * as path from 'path';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
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

const app = new express();
server.applyMiddleware({ app });
app.use(cors({ origin: '*' }));

// The 'files' directory should be a docker volume, maybe in a dedicated container
const UPLOAD_PATH = path.join(__dirname, '..', 'files');
app.use('/files', express.static(UPLOAD_PATH));

app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  const uploadFile = req.files.image;
  const fileName = uploadFile.name;
  console.log('FILE: ');
  console.log(uploadFile);
  uploadFile.mv(`${UPLOAD_PATH}/${fileName}`, err => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send(uploadFile.name);
  });
});

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);
