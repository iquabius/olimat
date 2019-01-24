import React from 'react';
import { render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '../../utils/test/FakeDataProvider';
import { renderApollo } from '../../utils/test/test-utils';

import TestList from './List';

// <Link /> usa 'next/router' pra definir se o link está ativo (páginal atual)
jest.mock('next/router');

describe('<TestList />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<TestList />);
    getByText(/loading/i);
  });

  test('renders some tests', async () => {
    const { container, getByLabelText } = render(
      <FakeDataProvider>
        <TestList />
      </FakeDataProvider>,
    );

    await waitForElement(() => getByLabelText('Editar prova'));
    expect(container.querySelector('ul').children.length).toBe(2);
  });
});
