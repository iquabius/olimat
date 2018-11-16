// 1. We should deal with the fact that nullable GraphQL fields can be null in responses
//    and set them to be empty strings. Same applies for any other optional property
// 2. We should convert empty string values back to undefined or null or whatever
//    the API’s contract is
// 3. Inputs can export parsing and formatting helpers used here. Our internal MoneyInput
//    for instance has a static MoneyInput.parseMoneyValue and MoneyInput.convertToMoneyValue
//    to be used here

// These empty choices are here so that Formik can render 5 input fields
const emptyChoices = [{ text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }];

export const responseToFormValues = response => ({
  id: response.id,
  type: response.type,
  wording: response.wording,
  imageUrl: response.imageUrl,
  imageFullUrl: response.imageFullUrl,
  secondaryWording: response.secondaryWording,
  choices: response.choices.length > 0 ? response.choices : emptyChoices,
});

/**
 * Transforms an array of choices [{ id: '1Ba', text: 'Lorem ipsum' }] into
 * an object for 'choices' field in updateQuestion mutation:
 *
 * {create: [{ id: '1Ba', text: 'Lorem ipsum' }]
 *
 * {delete: [{ id: '1Ba'}]
 *
 * {update: [{ where: { id: '1Ba' }, data: { text: 'Lorem ipsum' } }]}
 * @param {Array<{id: String, text: String}>} choices - Choices array
 * @param {String} type - Question type: MULTIPLE_CHOICE or OPEN_ENDED
 */
const choicesValuesToRequest = (choices, type) => {
  // Se as alternativas têm o atributo 'id', a questão já existe, e é de
  // Múltipla Escolha. Então precisamos atualizar as alternativas.
  if (choices[0].id && type === 'MULTIPLE_CHOICE') {
    // [QuestionChoiceUpdateWithWhereUniqueNestedInput]
    return { update: choices.map(({ id, text }) => ({ where: { id }, data: { text } })) };
  }
  // A questão era de Múltipla Escolha, mas o usuário trocou pra Discursiva.
  // Então precisamos excluir as alternativas.
  if (choices[0].id && type === 'OPEN_ENDED') {
    return { delete: choices.map(({ id }) => ({ id })) };
  }
  // A questão era Discursiva e foi mudada para Múltipla Escolha. Ou a questão está
  // sendo adicionada agora. De qualquer forma, precisamos criar as alternativas.
  if (!choices[0].id && type === 'MULTIPLE_CHOICE') {
    // QuestionChoiceCreateInput
    return { create: choices };
  }

  throw new Error(
    `Question 'type' should be 'MULTIPLE_CHOICE' or 'OPEN_ENDED'. The value '${type}' is invalid.`,
  );
};

export const formValuesToRequest = values => ({
  type: values.type,
  wording: values.wording,
  imageUrl: values.imageUrl,
  secondaryWording: values.secondaryWording,
  choices: choicesValuesToRequest(values.choices, values.type),
});
