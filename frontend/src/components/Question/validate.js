// import { withoutEmptyErrorsByField } from "without-empty-errors-by-field";

const validate = values => {
  const errorsByField = { wording: null, imageUrl: null };

  if (!values.wording || values.wording.trim().length === 0) {
    errorsByField.wording = 'O Enunciado é obrigatório';
  }
  // if (!values.imageUrl || values.imageUrl.trim().length === 0)
  //   errorsByField.imageUrl = { required: true };

  return errorsByField;
};

export default validate;
