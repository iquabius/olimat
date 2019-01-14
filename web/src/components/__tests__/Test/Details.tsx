import React from 'react';
import { render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '../../../utils/test/FakeDataProvider';
import MockErrorProvider from '../../../utils/test/MockErrorProvider';
import MockNextContext from '../../../utils/test/MockNextContext';
import { renderApollo } from '../../../utils/test/test-utils';
import TestDetails from '../../Test/Details';

const MockTestDetails = () => (
  <MockNextContext router={{ query: { id: 'theTestId1' } }}>
    <TestDetails />
  </MockNextContext>
);

// Talvez uma solução melhor seria criar um mock para o contexto do Next.js
// https://github.com/zeit/next.js/issues/5205
// Outra opção é exportar o componente sem embrulhá-lo com os HoC, e passar os mocks
// https://stackoverflow.com/questions/44204828

describe('<TestDetails />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<MockTestDetails />);
    getByText(/loading/i);
  });

  test('renders the details of a test', async () => {
    const customResolvers = {
      Test: () => ({
        title: '2017 - Fase 3 - Ano 5',
      }),
    };
    const { getByText, getByTestId } = render(
      <FakeDataProvider customResolvers={customResolvers}>
        <MockTestDetails />
      </FakeDataProvider>,
    );

    await waitForElement(() => getByText(customResolvers.Test().title));

    const questionListNode = getByTestId('questionList');
    expect(questionListNode).toBeInTheDocument();
    // toBe(10) couples the test with the mocked server
    // https://youtu.be/K445DtQ5oHY?t=1476
    expect(questionListNode.children.length).toBe(10);
  });

  test('renders error message', async () => {
    const errorMsg = 'Que pena';

    const { getByText } = render(
      <MockErrorProvider graphqlErrors={[{ message: errorMsg }]}>
        <MockTestDetails />
      </MockErrorProvider>,
    );

    await waitForElement(() => getByText(errorMsg, { exact: false }));
  });
});
