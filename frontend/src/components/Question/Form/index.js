// const QuestionForm = ({ initialValues, onSubmit }) => {
//   const draft = "What's draft?";
//   onSubmit(draft);
// };
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionFormChoicesBox from './ChoicesBox';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const FormSchema = Yup.object().shape({
  wording: Yup.string()
    .min(32, 'Wording is Too Short! It should be at least 32 characters.')
    .required('Wording is required'),
});

// <input type="hidden" name="image" value="{"file":"/filepond_image_editor_plugin.gif"}">
const renderForm = (children, onClose) => formikProps => {
  const form = (
    <form onSubmit={formikProps.handleSubmit}>
      <DialogContent>
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
        <FilePond
          name="imageUrl"
          server="http://localhost:4000/upload"
          onprocessfile={(error, file) => {
            formikProps.setFieldValue('imageUrl', file.serverId);
          }}
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
        <QuestionFormChoicesBox formikProps={formikProps} />
      </DialogContent>
      <DialogActions>
        <Button disabled={formikProps.isSubmitting} onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button disabled={formikProps.isSubmitting} type="submit" color="primary">
          Adicionar
        </Button>
      </DialogActions>
    </form>
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
    render={renderForm(children, onClose)}
  />
);

QuestionForm.propTypes = {
  children: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;
