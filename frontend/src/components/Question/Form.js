// const QuestionForm = ({ initialValues, onSubmit }) => {
//   const draft = "What's draft?";
//   onSubmit(draft);
// };
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import { Formik } from 'formik';
import QuestionTypeConnector from './TypesConnector';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  wording: Yup.string()
    .min(32, 'Wording is Too Short! It should be at least 32 characters.')
    .required('Wording is required'),
});

const renderForm = children => formikProps => {
  const form = (
    <QuestionTypeConnector>
      {({ questionTypes }) => (
        <React.Fragment>
          <TextField
            name="wording"
            autoFocus
            margin="dense"
            multiline
            label="Enunciado"
            fullWidth
            rows={3}
            variant="outlined"
            error={formikProps.touched.wording && formikProps.errors.wording !== null}
            helperText={formikProps.errors.wording || ''}
            value={formikProps.values.wording}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
          <TextField
            name="imageUrl"
            margin="dense"
            label="URL da imagem"
            min="1999"
            max="2018"
            fullWidth
            variant="outlined"
            value={formikProps.values.imageUrl}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
          <TextField
            name="secondaryWording"
            margin="dense"
            multiline
            label="Enunciado Secundário"
            fullWidth
            rows={2}
            variant="outlined"
            value={formikProps.values.secondaryWording}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
          <TextField
            id="question-select-type"
            name="type"
            select
            label="Tipo"
            fullWidth
            variant="outlined"
            // className={classes.textField}
            value={formikProps.values.type}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
            SelectProps={{
              MenuProps: {
                // className: classes.menu,
              },
            }}
            // helperText="Selecione o tipo da questão"
            margin="normal"
          >
            {questionTypes.map(type => (
              <MenuItem key={type.name} value={type.name}>
                {type.description}
              </MenuItem>
            ))}
          </TextField>
        </React.Fragment>
      )}
    </QuestionTypeConnector>
  );

  return children({
    form,
    isDirty: formikProps.dirty,
    isSubmitting: formikProps.isSubmitting,
    handleSubmit: formikProps.handleSubmit,
    handleCancel: formikProps.resetForm,
  });
};

// check these Formik props: enableReinitialize validate={validate}
const QuestionForm = ({ children, initialValues, onClose, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={FormSchema}
    onSubmit={(values, formikBag) => {
      // This is quite detailed and a work around
      // to be able to encapsulate attaching state handling
      // upon submission within the form. The details/create
      // component just `addHandlers` to it's mutation.
      const addHandlers = promise =>
        promise.then(
          result => {
            formikBag.resetForm();
            formikBag.setSubmitting(false);
            onClose();

            return result;
          },
          error => {
            formikBag.setSubmitting(false);
            formikBag.setErrors(error.validationErrors);

            throw error;
          },
        );

      return onSubmit(values, addHandlers);
    }}
    render={renderForm(children)}
  />
);

QuestionForm.propTypes = {
  children: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;
