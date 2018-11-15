import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionFormChoicesBox from './ChoicesBox';
import QuestionFormActionBox from './ActionBox';
import QuestionFormFilePondField from './FilePondField';
import { withState } from 'recompose';

const FormSchema = Yup.object().shape({
  wording: Yup.string()
    .min(32, 'Wording is Too Short! It should be at least 32 characters.')
    .required('Wording is required'),
});

// This is used to keep a reference to FilePond, created in FilePondField
// We need this to be able to 'clear' the pond when reseting the form.
let filePond;
const getFilePondRef = ref => {
  filePond = ref;
};

const QuestionForm = ({ children, initialValues, onSubmit, imageFile, setImageFile }) => (
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
            // Empties the pond (pun intended)
            setImageFile(null);
            filePond.removeFile(imageFile);
            formikBag.setSubmitting(false);
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
    render={formikProps => {
      const form = (
        <form onSubmit={formikProps.handleSubmit}>
          <TextField
            name="wording"
            autoFocus
            multiline
            label="Enunciado"
            fullWidth
            rows={4}
            rowsMax={8}
            variant="outlined"
            error={formikProps.touched.wording && formikProps.errors.wording !== undefined}
            helperText={(formikProps.touched.wording && formikProps.errors.wording) || ''}
            value={formikProps.values.wording}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
          />
          <QuestionFormFilePondField
            imageFile={imageFile}
            setImageFile={setImageFile}
            refGetter={getFilePondRef}
            formikProps={formikProps}
          />
          <TextField
            name="secondaryWording"
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
          <QuestionFormActionBox formikProps={formikProps} />
        </form>
      );

      // If there isn't a children prop function, render form directly
      if (!children) {
        return form;
      }

      return children({
        form,
        isDirty: formikProps.dirty,
        isSubmitting: formikProps.isSubmitting,
        handleSubmit: formikProps.handleSubmit,
        handleCancel: formikProps.resetForm,
      });
    }}
  />
);

QuestionForm.propTypes = {
  children: PropTypes.func,
  imageFile: PropTypes.object,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  setImageFile: PropTypes.func.isRequired,
};

export default withState('imageFile', 'setImageFile', null)(QuestionForm);
