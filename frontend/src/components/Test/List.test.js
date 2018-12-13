/* eslint-env jest */
import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import TestList from './List';
import { allTests } from './ListConnector';

// <Link /> usa 'next/router' pra definir se o link está ativo (páginal atual)
jest.mock('next/router');

describe('<TestList />', () => {
  test('renders loading state initially', () => {
    const { getByText } = render(
      <MockedProvider>
        <TestList />
      </MockedProvider>,
    );
    getByText(/loading/i);
  });

  test('renders some tests', async () => {
    const allTestsData = [
      { id: '1', title: 'Prova 1' },
      { id: '2', title: 'Prova 2' },
      { id: '3', title: 'Prova 3' },
    ];

    const mocks = [
      {
        request: { query: allTests },
        result: { data: { tests: allTestsData } },
      },
    ];

    const { container, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TestList />
      </MockedProvider>,
    );

    await waitForElement(() => getByText(allTestsData[0].title));
    expect(container.querySelector('ul').children.length).toBe(allTestsData.length);
  });
});
