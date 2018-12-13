/* eslint-env jest */
import React from 'react';
import { render } from 'react-testing-library';
import QuestionItem from './QuestionItem';

describe('<TestQuestionItem />', () => {
  const questionSample = {
    wording: 'Amostra de questão',
    imageFullUrl: 'test-sample-image.jpg',
    choices: [
      { id: 'cId1', text: 'Alternativa A' },
      { id: 'cId2', text: 'Alternativa B' },
      { id: 'cId3', text: 'Alternativa C' },
      { id: 'cId4', text: 'Alternativa D' },
      { id: 'cId5', text: 'Alternativa E' },
    ],
  };

  test('renders a question', () => {
    const { container, getByAltText, getByText } = render(
      <QuestionItem number={1} question={questionSample} />,
    );

    // Confere se a imagem foi renderizada com o atributo 'src' correto
    expect(getByAltText('Imagem da questão')).toHaveAttribute('src', questionSample.imageFullUrl);

    // Confere se o enunciado foi renderizado
    getByText(questionSample.wording);

    // Confere se a lista de alternativas foi renderizada,
    // com a quantidade certa de itens
    // TODO: Talvez isso devesse ser testado no <ChoicesList />
    const choicesList = container.querySelector('ul');
    expect(choicesList.children.length).toBe(questionSample.choices.length);
  });
});
