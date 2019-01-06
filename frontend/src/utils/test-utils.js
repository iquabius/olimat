/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { render } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// https://graphql.org/graphql-js/graphql/
import { graphql } from 'graphql';
import gql from 'graphql-tag';
import { importSchema } from 'graphql-import';
import path from 'path';

// eslint-disable-next-line import/prefer-default-export
export const renderApollo = (
  node,
  { mocks, addTypename = false, defaultOptions, cache, ...options } = {},
) => {
  return render(
    <MockedProvider
      mocks={mocks}
      addTypename={addTypename}
      defaultOptions={defaultOptions}
      cache={cache}
    >
      {node}
    </MockedProvider>,
    options,
  );
};

// Ideia tirada do vídeo abaixo:
// How Level Up Tests Apollo Queries - Level Up Code Blog
// https://youtu.be/OCBWsscJFEQ
// https://gist.github.com/stolinski/7cea67d470b4299828b1293aa8cbde0c
// An example with 'apollo-link-state':
// https://gist.github.com/kristianmandrup/1f7e4a550e6c32b99881aa1b78a4a440

// We have to use importSchema() because schema.graphql imports from
// 'backend/src/__generated__/prisma.graphql'
const schemaPath = path.join(__dirname, '../../../backend/src/schema.graphql');
const typeDefs = gql(importSchema(schemaPath));

// Make a GraphQL schema with no resolvers
// https://www.apollographql.com/docs/apollo-server/v2/api/graphql-tools.html#makeExecutableSchema

const schema = makeExecutableSchema({
  resolverValidationOptions: { requireResolversForResolveType: false },
  typeDefs,
});

// Creates random id
const revisedRandId = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '')
    .substr(2, 10);

// Makes all ID types random ids instead of a hello world string
const mocks = {
  ID: () => revisedRandId(),
};

// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema, mocks });

// Takes a query and args and returns mocked data
export const mockData = async (query, args = {}) => {
  try {
    const res = await graphql(schema, query.loc.source.body, null, null, args);
    return res.data;
  } catch (e) {
    return console.log(e.message);
  }
};
