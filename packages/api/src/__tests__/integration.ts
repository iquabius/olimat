import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
// https://www.prisma.io/forum/t/testing-with-graphql-request/537
import nock from 'nock';

import { createTestServer } from './__utils';

const getCitiesQuery = gql`
  query getCities {
    cities {
      id
      name
    }
  }
`;

const getCityQuery = gql`
  query getCity($id: ID!) {
    city(id: $id) {
      id
      name
    }
  }
`;

describe('Queries', () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());

  afterEach(() => nock.cleanAll());

  test('fetches list of cities', async () => {
    const mockCities = [
      { id: 'cId1', name: 'Cáceres' },
      { id: 'cId2', name: 'Cuiabá' },
      { id: 'cId3', name: 'Sinop' },
    ];

    // Intercepta requisição ao servidor do prisma e simula uma resposta.
    // Use o 'recorder' pra inspecionar as requisições.
    // nock.recorder.rec();
    nock('http://localhost:4466')
      .post('/olimat-api/dev')
      .reply(200, [
        {
          data: {
            cities: mockCities,
          },
        },
      ]);

    const server = createTestServer();

    // Usa o servidor de teste como entrata para a função createTestClient.
    // Isso nos fornece uma interface parecida com o apolloClient.query,
    // para executar consultas a instância do ApolloServer.
    const { query } = createTestClient(server);
    const res = await query({ query: getCitiesQuery });
    expect(res).toMatchSnapshot();
  });

  // 'query', de createTestServer(), está com o tipo errado, parece um bug.
  test('fetches single city', async () => {
    const mockCity = { id: 'cId1', name: 'Barra do Bugres' };

    // nock.recorder.rec();
    nock('http://localhost:4466')
      .post('/olimat-api/dev')
      .reply(200, [
        {
          data: {
            city: mockCity,
          },
        },
      ]);

    const server = createTestServer();

    const { query } = createTestClient(server);
    const res = await query({ query: getCityQuery, variables: { id: mockCity.id } });
    expect(res).toMatchSnapshot();
    expect(res.data.city).toEqual(mockCity);
  });
});
