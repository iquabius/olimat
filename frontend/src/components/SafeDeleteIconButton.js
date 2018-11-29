import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import compose from 'recompose/compose';
import { withState } from 'recompose';
import DeleteConnector from './Question/DeleteConnector';
import Router from 'next/router';
import DeleteWarningDialog from './DeleteWarningDialog';
import OliSnackbar from './OliSnackbar';

const styles = theme => ({
  root: {
    '&:hover': {
      color: 'inherit',
    },
  },
});

const deleteHandler = (deleteQuestion, question, setSnackbarOpen, setSubmitting) => () => {
  setSubmitting(true);
  deleteQuestion({
    variables: {
      id: question.id,
    },
  })
    .then(response => {
      console.log(`Delete Question Mutation response: `); // eslint-disable-line no-console
      console.log(response); // eslint-disable-line no-console
      setSnackbarOpen(true);
      setSubmitting(false);
      Router.push('/admin/questoes');
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error); // eslint-disable-line no-console
    });
};

const onCancelDelete = (setDeleteWarningOpen, setSubmitting) => () => {
  setSubmitting(false);
  setDeleteWarningOpen(false);
};

/**
 * Truncates a string to a certain number of words.
 * @param {String} str String to truncate
 * @param {Number} noWords Number of words
 */
const truncate = (str, noWords) =>
  str
    .split(' ')
    .splice(0, noWords)
    .join(' ')
    .concat(' [...]');

const closeSnackbarHandler = setSnackbarOpen => (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSnackbarOpen(false);
};

function SafeDeleteIconButton({
  classes,
  deleteWarningOpen,
  question,
  setDeleteWarningOpen,
  setSnackbarOpen,
  setSubmitting,
  snackbarOpen,
  submitting,
  ...otherProps
}) {
  return (
    <DeleteConnector>
      {deleteQuestion => (
        <React.Fragment>
          <IconButton
            className={classes.root}
            disabled={submitting}
            onClick={() => setDeleteWarningOpen(true)}
            {...otherProps}
          >
            <DeleteIcon />
          </IconButton>
          <DeleteWarningDialog
            title={`Excluir “${truncate(question.wording, 7)}“?`}
            content={`A questão “${truncate(question.wording, 7)}” será apagada permanentemente.`}
            isSubmitting={submitting}
            open={deleteWarningOpen}
            onCancel={onCancelDelete(setDeleteWarningOpen, setSubmitting)}
            onSuccess={deleteHandler(deleteQuestion, question, setSnackbarOpen, setSubmitting)}
          />
          <OliSnackbar
            message="Questão excluída"
            open={snackbarOpen}
            onClose={closeSnackbarHandler(setSnackbarOpen)}
            variant="success"
          />
        </React.Fragment>
      )}
    </DeleteConnector>
  );
}

SafeDeleteIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteWarningOpen: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setDeleteWarningOpen: PropTypes.func.isRequired,
  setSnackbarOpen: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  snackbarOpen: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default compose(
  withState('snackbarOpen', 'setSnackbarOpen', false),
  withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
  withState('submitting', 'setSubmitting', false),
  withStyles(styles),
)(SafeDeleteIconButton);
