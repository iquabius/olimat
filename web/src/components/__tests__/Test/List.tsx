import React from 'react';
import { waitForElement, render } from 'react-testing-library';
import { renderApollo } from '../../../utils/test/test-utils';
import TestList from '../../Test/List';
import FakeDataProvider from '../../../utils/test/FakeDataProvider';

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
