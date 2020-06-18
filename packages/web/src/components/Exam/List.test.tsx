import React from 'react';
import { render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '@olimat/web/utils/test/FakeDataProvider';
import MockNextContext from '@olimat/web/utils/test/MockNextContext';
import { renderApollo } from '@olimat/web/utils/test/test-utils';

import ExamList from './List';

const MockExamList = () => (
	<MockNextContext router={{ query: { id: 'theExamId1' } }}>
		<ExamList />
	</MockNextContext>
);

describe('<ExamList />', () => {
	test.skip('renders loading state initially', () => {
		const { getByText } = renderApollo(<ExamList />);
		getByText(/loading/i);
	});

	test('renders some exams', async () => {
		const { container, getByLabelText } = render(
			<FakeDataProvider>
				<MockExamList />
			</FakeDataProvider>,
		);

		await waitForElement(() => getByLabelText('Editar prova'));
		expect(container.querySelector('ul').children.length).toBe(2);
	});
});
