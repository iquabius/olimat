/* eslint-env jest */
import React from 'react';
import QuestionDetails from './Details';
import { renderApollo } from '../../utils/test/test-utils';
import { waitForElement, fireEvent, render } from 'react-testing-library';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import FakeDataProvider from '../../utils/test/FakeDataProvider';
import MockErrorProvider from '../../utils/test/MockErrorProvider';
import MockNextContext from '../../utils/test/MockNextContext';

const MockQuestionDetails = () => (
  <MockNextContext router={{ query: { id: 'theQuestionId1' } }}>
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
    expect(questionImage).toHaveAttribute('src', customResolvers.Question().imageFullUrl);

    // Confere se a lista de alternativas foi renderizada,
    // com a quantidade certa de itens
    const choicesList = container.querySelector('ul');
    expect(choicesList).toHaveTextContent(customResolvers.Question().choices[0].text);
    expect(choicesList.children.length).toBe(customResolvers.Question().choices.length);
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
