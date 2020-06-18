import React from 'react';
import { render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '@olimat/web/utils/test/FakeDataProvider';
import MockErrorProvider from '@olimat/web/utils/test/MockErrorProvider';
import MockNextContext from '@olimat/web/utils/test/MockNextContext';
import { renderApollo } from '@olimat/web/utils/test/test-utils';

import ExamDetails from './Details';

const MockExamDetails = () => (
	<MockNextContext router={{ query: { id: 'theExamId1' } }}>
		<ExamDetails />
	</MockNextContext>
);

// Talvez uma solução melhor seria criar um mock para o contexto do Next.js
// https://github.com/zeit/next.js/issues/5205
// Outra opção é exportar o componente sem embrulhá-lo com os HoC, e passar os mocks
// https://stackoverflow.com/questions/44204828

describe('<ExamDetails />', () => {
	test.skip('renders loading state initially', () => {
		const { getByText } = renderApollo(<MockExamDetails />);
		getByText(/loading/i);
	});

	test('renders the details of an exam', async () => {
		const customResolvers = {
			// We need to update the GraphQL API as well
			Exam: () => ({
				title: '2017 - Fase 3 - Ano 5',
			}),
		};
		const { getByText, getByTestId } = render(
			<FakeDataProvider customResolvers={customResolvers}>
				<MockExamDetails />
			</FakeDataProvider>,
		);

		await waitForElement(() => getByText(customResolvers.Exam().title));

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
				<MockExamDetails />
			</MockErrorProvider>,
		);

		await waitForElement(() => getByText(errorMsg, { exact: false }));
	});
});
