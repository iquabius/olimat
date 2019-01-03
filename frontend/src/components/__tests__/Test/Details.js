/* eslint-env jest */
import React from 'react';
import { waitForElement } from 'react-testing-library';
import { renderApollo } from '../../../utils/test-utils';
import TestDetails from '../../Test/Details';
import { testQuery } from '../../Test/DetailsConnector';

// <TestDetails /> usa o router pra pegar o id da prova na url
// https://devblog.xero.com/mocking-a-react-higher-order-component-hoc-with-jest-mock-fd59d5a20a97
jest.mock('next/router', () => ({
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { query: { id: 'testId1' } },
    };
    return component;
  },
}));

// Talvez uma solução melhor seria criar um mock para o contexto do Next.js
// https://github.com/zeit/next.js/issues/5205
// Outra opção é exportar o componente sem embrulhá-lo com os HoC, e passar os mocks
// https://stackoverflow.com/questions/44204828

const testSample = {
  id: 'testId1',
  title: 'Amostra de prova',
  questions: [
    {
      id: 'questionId1',
      wording: 'Enunciado da questão de amostra',
      imageUrl: 'test-sample-image.jpg',
      imageFullUrl: 'http://host.com/test-sample-image.jpg',
      secondaryWording: '',
      choices: [
        {
          id: 'choiceId1',
          text: '',
        },
      ],
    },
  ],
};

describe('<TestDetails />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<TestDetails />);
    getByText(/loading/i);
  });

  test('renders the details of a test', async () => {
    const mocks = [
      {
        request: {
          query: testQuery,
          variables: {
            id: testSample.id,
          },
        },
        result: { data: { test: testSample } },
      },
    ];

    const { getByText, getByTestId } = renderApollo(<TestDetails />, { mocks });

    await waitForElement(() => getByText(testSample.title));

    const questionListNode = getByTestId('questionList');
    expect(questionListNode).toBeInTheDocument();
    expect(questionListNode.children.length).toBe(testSample.questions.length);
  });

  test('renders error message', async () => {
    const errorMsg = 'Que pena';
    const mocks = [
      {
        request: { query: testQuery, variables: { id: testSample.id } },
        error: new Error(errorMsg),
      },
    ];

    const { getByText } = renderApollo(<TestDetails />, { mocks });

    await waitForElement(() => getByText(errorMsg, { exact: false }));
  });
});
