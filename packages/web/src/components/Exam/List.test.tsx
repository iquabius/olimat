import React from 'react';
import { render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '@olimat/web/utils/test/FakeDataProvider';
import { renderApollo } from '@olimat/web/utils/test/test-utils';

import ExamList from './List';

// <Link /> usa 'next/router' pra definir se o link está ativo (páginal atual)
jest.mock('next/router');

describe('<ExamList />', () => {
  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<ExamList />);
    getByText(/loading/i);
  });

  test('renders some exams', async () => {
    const { container, getByLabelText } = render(
      <FakeDataProvider>
        <ExamList />
      </FakeDataProvider>,
    );

    await waitForElement(() => getByLabelText('Editar prova'));
    expect(container.querySelector('ul').children.length).toBe(2);
  });
});
