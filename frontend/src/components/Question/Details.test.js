/* eslint-env jest */
import React from 'react';
import QuestionDetails from './Details';
import { renderApollo, mockData } from '../../utils/test-utils';
import { questionQuery } from './DetailsConnector';
import { waitForElement, fireEvent } from 'react-testing-library';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';

jest.mock('next/router', () => ({
  withRouter: component => {
    component.defaultProps = {
      ...component.defaultProps,
      router: { query: { id: 'theQuestionId1' } },
    };
    return component;
  },
}));

const QuestionDetailsWithSnackbar = () => (
  <SnackbarProvider maxSnack={3}>
    <QuestionDetails />
  </SnackbarProvider>
);

describe('<QuestionDetails />', () => {
  const mockQuestionId = 'theQuestionId1';

  test('renders loading state initially', () => {
    const { getByText } = renderApollo(<QuestionDetailsWithSnackbar />);
    getByText(/carregando/i);
  });

  test('renders error message', async () => {
    const errorMsg = 'Que pena';
    const mocks = [
      {
        request: { query: questionQuery, variables: { id: mockQuestionId } },
        error: new Error(errorMsg),
      },
    ];

    const { getByText } = renderApollo(<QuestionDetailsWithSnackbar />, { mocks });

    await waitForElement(() => getByText(errorMsg, { exact: false }));
  });

  test('renders the details of a question', async () => {
    const data = await mockData(questionQuery, { id: mockQuestionId });
    // console.log(JSON.stringify(data, null, 2));

    const mocks = [
      {
        request: { query: questionQuery, variables: { id: mockQuestionId } },
        result: { data },
      },
    ];

    const { container, getByText, getByAltText } = renderApollo(<QuestionDetailsWithSnackbar />, {
      mocks,
    });

    await waitForElement(() => getByText(data.question.wording));

    // TODO: Add imageAltDescription to Question type
    const questionImage = getByAltText('Imagem da questão');
    expect(questionImage).toHaveAttribute('src', data.question.imageFullUrl);

    getByText(data.question.secondaryWording);
    // Confere se a lista de alternativas foi renderizada,
    // com a quantidade certa de itens
    const choicesList = container.querySelector('ul');
    expect(choicesList.children.length).toBe(data.question.choices.length);
  });

  test('clicking on delete button shows a warning dialog', async () => {
    const data = await mockData(questionQuery, { id: mockQuestionId });

    const mocks = [
      {
        request: { query: questionQuery, variables: { id: mockQuestionId } },
        result: { data },
      },
    ];

    const { getByText, getByLabelText } = renderApollo(<QuestionDetailsWithSnackbar />, { mocks });

    await waitForElement(() => getByText(data.question.wording));

    const deleteButton = getByLabelText('Excluir questão');
    fireEvent.click(deleteButton);

    expect(deleteButton).toBeDisabled();
    getByText(/será apagada permanentemente/);

    const cancelDeleteButton = getByLabelText('Cancelar excluir questão');
    fireEvent.click(cancelDeleteButton);

    expect(deleteButton).not.toBeDisabled();
  });

  // Could not mock Router.push()
  xtest('clicking on edit link should go edit form page', async () => {
    const data = await mockData(questionQuery, { id: mockQuestionId });
    // console.log(JSON.stringify(data, null, 2));

    const mocks = [
      {
        request: {
          query: questionQuery,
          variables: {
            id: mockQuestionId,
          },
        },
        result: { data },
      },
    ];

    const { container, getByText, getByTestId } = renderApollo(<QuestionDetailsWithSnackbar />, {
      mocks,
    });

    await waitForElement(() => getByText(data.question.wording));

    const editLink = container.querySelector('[aria-label~=Editar]');
    // prettyDOM(editLink);
    fireEvent.click(editLink);
    expect(Router.push).toHaveBeenCalled();
    // expect(editLink).toHaveAttribute('title', 'Editar');
  });
});
