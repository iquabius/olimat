import React from 'react';
import { render } from 'react-testing-library';

import ExamQuestionItem from './QuestionItem';

describe('<ExamQuestionItem />', () => {
  const questionSample = {
    id: 'qId1',
    wording: 'Amostra de questão',
    imageFullUrl: 'exam-question-sample-image.jpg',
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
      <ExamQuestionItem questionNumber={1} question={questionSample} />,
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
