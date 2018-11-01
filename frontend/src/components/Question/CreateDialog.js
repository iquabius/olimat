import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, DialogContent, DialogActions } from '@material-ui/core';
import CreateConnector from './CreateConnector';
import QuestionForm from './Form';
import { formValuesToRequest } from './transforms';

// const createHandleSubmit = memoize(execute => (values, addHandlers) =>
const createHandleSubmit = createQuestion => (values, addHandlers) => {
  console.log('VALUES: ');
  console.log(values);
  // This is where `addHandlers` comes in handy as the form controls its state
  addHandlers(
    createQuestion({
      variables: { input: formValuesToRequest(values) },
    })
      .then(() => {
        console.log('addHandlers OK!');
        // this.props.showNotification();
      })
      .catch(error => {
        // The component is and should not be aware of this being a GraphQL error.
        console.log('addHandlers ERROR:');
        console.log(error);
        // this.props.showApiErrorNotification(error);
      }),
  );
};
// );

const questionInitialValues = {
  type: 'MULTIPLE_CHOICE',
  wording: '',
  imageUrl: '',
  secondaryWording: '',
};

const CreateDialog = ({ open, onClose }) => (
  <CreateConnector>
    {({ createQuestion }) => {
      return (
        <Dialog open={open} onClose={onClose} aria-labelledby="create-question-dialog">
          <DialogTitle id="create-question-dialog">Adicione uma questão</DialogTitle>
          <QuestionForm
            initialValues={questionInitialValues}
            onClose={onClose}
            onSubmit={createHandleSubmit(createQuestion)}
          >
            {({ form, isDirty, isSubmitting, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <DialogContent>{form}</DialogContent>
                <DialogActions>
                  <Button disabled={isSubmitting} onClick={onClose} color="primary">
                    Cancelar
                  </Button>
                  <Button disabled={isSubmitting} type="submit" color="primary">
                    Adicionar
                  </Button>
                </DialogActions>
              </form>
            )}
          </QuestionForm>
        </Dialog>
      );
    }}
  </CreateConnector>
);

CreateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

export default CreateDialog;
