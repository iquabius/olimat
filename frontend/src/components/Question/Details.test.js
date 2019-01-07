/* eslint-env jest */
import React from 'react';
import QuestionDetails from './Details';
import { renderApollo, mockData } from '../../utils/test/test-utils';
import { questionQuery } from './DetailsConnector';
import { waitForElement, fireEvent, render } from 'react-testing-library';
import Router from 'next/router';
import { SnackbarProvider } from 'notistack';
import FakeDataProvider from '../../utils/test/FakeDataProvider';
import MockErrorProvider from '../../utils/test/MockErrorProvider';

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

    const { getByText } = render(
      <MockErrorProvider graphqlErrors={[{ message: errorMsg }]}>
        <QuestionDetailsWithSnackbar />
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
        <QuestionDetailsWithSnackbar />
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

  test('clicking on delete button shows a warning dialog', async () => {
    const { getByText, getByLabelText } = render(
      <FakeDataProvider>
        <QuestionDetailsWithSnackbar />
      </FakeDataProvider>,
    );

    await waitForElement(() => getByLabelText('Excluir questão'));

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
