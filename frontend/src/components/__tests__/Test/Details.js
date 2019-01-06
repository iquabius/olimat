/* eslint-env jest */
import React from 'react';
import { waitForElement } from 'react-testing-library';
import { renderApollo, mockData } from '../../../utils/test-utils';
import TestDetails from '../../Test/Details';
import { testQuery } from '../../Test/DetailsConnector';

// <TestDetails /> usa o router pra pegar o id da prova na url
// https://devblog.xero.com/mocking-a-react-higher-order-component-hoc-with-jest-mock-fd59d5a20a97
jest.mock('next/router', () => ({
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { query: { id: 'theTestId1' } },
    };
    return component;
  },
}));

// Talvez uma solução melhor seria criar um mock para o contexto do Next.js
// https://github.com/zeit/next.js/issues/5205
// Outra opção é exportar o componente sem embrulhá-lo com os HoC, e passar os mocks
// https://stackoverflow.com/questions/44204828

describe('<TestDetails />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<TestDetails />);
    getByText(/loading/i);
  });

  test('renders the details of a test', async () => {
    // The way we're handling this id is weird
    // Maybe mockData could build the object for the mocks Array,
    // and return it too:
    // const { data, mock } mockOperation(getCitiesQuery);
    // <MockedProvider mocks={[mock]}></MockedProvider>
    const data = await mockData(testQuery, { id: 'theTestId1' });
    // console.log(JSON.stringify(data, null, 2));

    // Maybe we should use 'nock' to make the integration test more high level
    const mocks = [
      {
        request: {
          query: testQuery,
          variables: {
            id: 'theTestId1',
          },
        },
        result: { data },
      },
    ];

    const { getByText, getByTestId } = renderApollo(<TestDetails />, { mocks });

    await waitForElement(() => getByText(data.test.title));

    const questionListNode = getByTestId('questionList');
    expect(questionListNode).toBeInTheDocument();
    expect(questionListNode.children.length).toBe(data.test.questions.length);
  });

  test('renders error message', async () => {
    const errorMsg = 'Que pena';
    const mocks = [
      {
        request: { query: testQuery, variables: { id: 'theTestId1' } },
        error: new Error(errorMsg),
      },
    ];

    const { getByText } = renderApollo(<TestDetails />, { mocks });

    await waitForElement(() => getByText(errorMsg, { exact: false }));
  });
});
