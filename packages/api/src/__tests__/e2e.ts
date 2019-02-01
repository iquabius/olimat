/**
 * Estes testes estão utilizando o mesmo serviço usado pra
 * desenvolvimento. Talvez seja melhor configurar um serviço
 * somente para testes. Atualmente se uma entidade for excluída
 * pela aplicação frontend, alguns testes podem falhar.
 * Acho que isso possa ser feito com um '.env.test'. Também
 * precisamos resetar esse serviço de alguma forma:
 * 'npx prisma seed --reset'
 */

// import our production apollo-server instance
import { gql } from 'apollo-server-express';

import { server } from '../';
import { City } from '../__generated__/prisma-client';

import { startTestServer, toPromise } from './__utils';

// O id muda toda vez que semeamos o serviço do prisma,
// então os testes com 'snapshot' falham.
const getCitiesQuery = gql`
  query getCities {
    cities {
      name
    }
  }
`;

const getCitiesWithIdsQuery = gql`
  query getCitiesWithIds {
    cities {
      id
      name
    }
  }
`;

const getCityQuery = gql`
  query getCity($id: ID!) {
    city(id: $id) {
      name
    }
  }
`;

interface GetCitiesQueryResponse {
  data: { cities: City[] };
}

describe('API - e2e', () => {
  let stop;
  let graphql;

  beforeEach(async () => {
    const testServer = await startTestServer(server);
    stop = testServer.stop;
    graphql = testServer.graphql;
  });

  afterEach(() => stop());

  test('gets list of cities', async () => {
    const res: GetCitiesQueryResponse = await toPromise(
      graphql({
        query: getCitiesQuery,
      }),
    );

    expect(res).toMatchSnapshot();
  });

  test('gets a single city', async () => {
    // O id sempre muda, então primeiro buscamos uma lista de todas as cidades.
    // graphqlgen talvez gere um tipo que podemos usar aqui.
    const allCitiesRes: GetCitiesQueryResponse = await toPromise(
      graphql({
        query: getCitiesWithIdsQuery,
      }),
    );
    // Pegamos a primeira cidade.
    const firstCity: City = allCitiesRes.data.cities[0];

    // Buscamos a cidade usando o id da primeira cidade retornada.
    // Isso parece redundante, parece que estamos testando o Prisma,
    // que não deveria ser nossa problema.
    const res = await toPromise(graphql({ query: getCityQuery, variables: { id: firstCity.id } }));

    expect(res).toMatchSnapshot();
  });
});
