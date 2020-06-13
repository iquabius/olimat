import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';

import FakeDataProvider from '@olimat/web/utils/test/FakeDataProvider';
import MockErrorProvider from '@olimat/web/utils/test/MockErrorProvider';
import mockGraphql from '@olimat/web/utils/test/mockGraphql';
import MockNextContext from '@olimat/web/utils/test/MockNextContext';
import { renderApollo } from '@olimat/web/utils/test/test-utils';

import { deleteQuestionMutation } from './DeleteConnector';
import QuestionDetails from './Details';
import { questionQuery } from './DetailsConnector';

const MockQuestionDetails = () => (
	<MockNextContext router={{ query: { id: 'theQuestionId1' } } as any}>
		<SnackbarProvider maxSnack={3}>
			<QuestionDetails />
		</SnackbarProvider>
	</MockNextContext>
);

describe('<QuestionDetails />', () => {
	test('renders loading state initially', () => {
		const { getByText } = renderApollo(<MockQuestionDetails />);
		getByText(/carregando/i);
	});

	test('renders error message', async () => {
		const errorMsg = 'Que pena';
		const { getByText } = render(
			<MockErrorProvider graphqlErrors={[{ message: errorMsg }]}>
				<MockQuestionDetails />
			</MockErrorProvider>,
		);
		await waitForElement(() => getByText(errorMsg, { exact: false }));
	});

	test('renders the details of a question', async () => {
		const customResolvers = {
			Question: () => ({
				wording: 'Maria comprou três maças...',
				secondaryWording: null,
				imageFullUrl: 'http://host.test/image.jpg',
				choices: [{ text: '5 maças' }, { text: '3 maças' }],
			}),
		};
		const { container, getByText, getByAltText } = render(
			<FakeDataProvider customResolvers={customResolvers}>
				<MockQuestionDetails />
			</FakeDataProvider>,
		);
		await waitForElement(() => getByText(customResolvers.Question().wording));

		// TODO: Add imageAltText to Question type
		const questionImage = getByAltText('Imagem da questão');
		expect(questionImage).toHaveAttribute(
			'src',
			customResolvers.Question().imageFullUrl,
		);

		// Confere se a lista de alternativas foi renderizada,
		// com a quantidade certa de itens
		const choicesList = container.querySelector('ul');
		expect(choicesList).toHaveTextContent(
			customResolvers.Question().choices[0].text,
		);
		expect(choicesList.children.length).toBe(
			customResolvers.Question().choices.length,
		);
	});

	test('clicking on delete button shows the warning dialog', async () => {
		const { getByText, getByLabelText } = render(
			<FakeDataProvider>
				<MockQuestionDetails />
			</FakeDataProvider>,
		);
		await waitForElement(() => getByLabelText('Excluir questão'));

		const deleteButton = getByLabelText('Excluir questão');
		fireEvent.click(deleteButton);

		expect(deleteButton).toBeDisabled();
		getByText(/será apagada permanentemente/);
	});

	test('clicking on cancel button hides the warning dialog', async () => {
		const { getByLabelText } = render(
			<FakeDataProvider>
				<MockQuestionDetails />
			</FakeDataProvider>,
		);
		await waitForElement(() => getByLabelText('Excluir questão'));

		const deleteButton = getByLabelText('Excluir questão');
		fireEvent.click(deleteButton);

		expect(deleteButton).toBeDisabled();

		const cancelDeleteButton = getByLabelText('Cancelar excluir questão');
		fireEvent.click(cancelDeleteButton);

		expect(deleteButton).not.toBeDisabled();
	});

	test('clicking on confirm button deletes the question', async () => {
		const { getByLabelText, getByText } = render(
			<FakeDataProvider>
				<MockQuestionDetails />
			</FakeDataProvider>,
		);
		await waitForElement(() => getByLabelText('Excluir questão'));

		const deleteButton = getByLabelText('Excluir questão');
		fireEvent.click(deleteButton);
		const confirmDeleteButton = getByLabelText('Confirmar excluir questão');
		fireEvent.click(confirmDeleteButton);

		expect(deleteButton).toBeDisabled();
		expect(confirmDeleteButton).toBeDisabled();
		await waitForElement(() => getByText('Questão excluída'));
		expect(Router.pathname).toMatchSnapshot();
	});

	// We can't use <FakeDataProvider/> because there's no way to mock an error.
	test('clicking on confirm button shows error if delete fails', async () => {
		const data = await mockGraphql(questionQuery, { id: '' });
		const errorMsg = 'Error deleting the question, try again.';

		const mocks = [
			{
				request: { query: questionQuery, variables: { id: data.question.id } },
				result: { data },
			},
			// Network error
			// {
			//   request: { query: deleteQuestionMutation, variables: { id: data.question.id } },
			//   error: new Error(errorMsg),
			// },
			{
				request: {
					query: deleteQuestionMutation,
					variables: { id: data.question.id },
				},
				result: { errors: [{ message: errorMsg }] },
			},
		];

		const { getByLabelText, getByText } = renderApollo(
			<MockNextContext router={{ query: { id: data.question.id } } as any}>
				<SnackbarProvider maxSnack={3}>
					<QuestionDetails />
				</SnackbarProvider>
			</MockNextContext>,
			{ mocks },
		);

		// Espera a questão ser carregada
		await waitForElement(() => getByLabelText('Excluir questão'));

		// Clica no botão pra excluir, mostra aviso
		const deleteButton = getByLabelText('Excluir questão');
		fireEvent.click(deleteButton);
		// Então clica no botão de confirmar (dispara a 'Mutation')
		const confirmDeleteButton = getByLabelText('Confirmar excluir questão');
		fireEvent.click(confirmDeleteButton);

		// Confere se os botões estão desativados enquanto a mutation é processada
		expect(deleteButton).toBeDisabled();
		expect(confirmDeleteButton).toBeDisabled();
		// Espera o erro aparecer
		await waitForElement(() => getByText(/Erro ao excluir questão:/));
		// Confere se o erro inclui a mensagem passada pelo Apollo Client
		expect(getByText(/Erro ao excluir questão:/)).toHaveTextContent(errorMsg);
		// Confere se o botão está ativo depois do erro
		expect(confirmDeleteButton).not.toBeDisabled();
		expect(deleteButton).toBeDisabled();
	});

	test('clicking edit link should go to edit form page', async () => {
		const customResolvers = {
			Question: () => ({
				// Used by the router to send users to edit question page
				id: 'AranDOMquestionID',
			}),
		};
		const { getByLabelText } = render(
			<FakeDataProvider customResolvers={customResolvers}>
				<MockQuestionDetails />
			</FakeDataProvider>,
		);
		await waitForElement(() => getByLabelText('Editar questão'));

		const editLink = getByLabelText('Editar questão');
		fireEvent.click(editLink);

		expect(Router.pathname).toMatchSnapshot();
	});
});
