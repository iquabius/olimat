/* eslint-env jest */
import React from 'react';
import { waitForElement } from 'react-testing-library';
import { renderApollo, mockData } from '../../../utils/test-utils';
import TestList from '../../Test/List';
import { allTests } from '../../Test/ListConnector';

// <Link /> usa 'next/router' pra definir se o link está ativo (páginal atual)
jest.mock('next/router');

describe('<TestList />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<TestList />);
    getByText(/loading/i);
  });

  test('renders some tests', async () => {
    const data = await mockData(allTests);
    // console.log(JSON.stringify(data, null, 2));

    const mocks = [
      {
        request: { query: allTests },
        result: { data },
      },
    ];

    const { container, getByText } = renderApollo(<TestList />, { mocks });

    await waitForElement(() => getByText(data.tests[0].title));
    expect(container.querySelector('ul').children.length).toBe(data.tests.length);
  });
});
