// 1. We should deal with the fact that nullable GraphQL fields can be null in responses
//    and set them to be empty strings. Same applies for any other optional property
// 2. We should convert empty string values back to undefined or null or whatever
//    the API’s contract is
// 3. Inputs can export parsing and formatting helpers used here. Our internal MoneyInput
//    for instance has a static MoneyInput.parseMoneyValue and MoneyInput.convertToMoneyValue
//    to be used here
export const responseToFormValues = response => ({
  id: response.id,
  type: response.type,
  wording: response.wording,
  imageUrl: response.imageUrl,
  secondaryWording: response.secondaryWording,
  choices: response.choices,
});

/**
 * Transforms and array of choices [{ id: '1Ba', text: 'Lorem ipsum' }] into
 * an object for 'choices' field in updateQuestion mutation:
 * {create: [{ id: '1Ba', text: 'Lorem ipsum' }]
 * {update: [{ where: { id: '1Ba' }, data: { text: 'Lorem ipsum' } }]}
 * @param {Array<{id: String, text: String}>} choices - Choices array
 */
const choicesValuesToRequest = choices => {
  if (choices[0].id) {
    // [QuestionChoiceUpdateWithWhereUniqueNestedInput]
    return { update: choices.map(({ id, text }) => ({ where: { id }, data: { text } })) };
  }
  // QuestionChoiceCreateInput
  return { create: choices };
};

export const formValuesToRequest = values => ({
  type: values.type,
  wording: values.wording,
  imageUrl: values.imageUrl,
  secondaryWording: values.secondaryWording,
  choices: values.type === 'MULTIPLE_CHOICE' ? choicesValuesToRequest(values.choices) : null,
});
