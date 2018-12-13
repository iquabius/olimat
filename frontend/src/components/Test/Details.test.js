/* eslint-env jest */
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import TestDetails from './Details';
import { testQuery } from './DetailsConnector';

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

const testSample = {
  id: 'testId1',
  title: 'Amostra de prova',
  questions: [
    {
      id: 'questionId1',
      wording: 'Enunciado da questão de amostra',
      imageUrl: 'test-sample-image.jpg',
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
  test('renders loading component initially', () => {
    const { getByText } = render(
      <MockedProvider>
        <TestDetails />
      </MockedProvider>,
    );
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

    const { getByText, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestDetails />
      </MockedProvider>,
    );

    await waitForElement(() => getByText(testSample.title));

    const questionListNode = getByTestId('questionList');
    expect(questionListNode).toBeInTheDocument();
    expect(questionListNode.children.length).toBe(testSample.questions.length);
  });
});
