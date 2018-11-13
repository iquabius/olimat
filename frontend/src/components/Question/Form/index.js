import React from 'react';
import PropTypes from 'prop-types';
import { TextField, withStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import QuestionFormChoicesBox from './ChoicesBox';
import QuestionFormActionBox from './ActionBox';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const styles = theme => ({
  filePond: {
    marginTop: theme.spacing.unit * 2,
  },
});

const FormSchema = Yup.object().shape({
  wording: Yup.string()
    .min(32, 'Wording is Too Short! It should be at least 32 characters.')
    .required('Wording is required'),
});

// <input type="hidden" name="image" value="{"file":"/filepond_image_editor_plugin.gif"}">
// check these Formik props: enableReinitialize validate={validate}
const QuestionForm = ({ children, classes, initialValues, onClose, onSubmit }) => (
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
            if (onClose) {
              onClose();
            }
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
          <FilePond
            name="imageUrl"
            server="http://localhost:4000/upload"
            onprocessfile={(error, file) => {
              formikProps.setFieldValue('imageUrl', file.serverId);
            }}
            className={classes.filePond}
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
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuestionForm);
