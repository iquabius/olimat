import { IconButton, withStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Router from 'next/router';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { withState } from 'recompose';
import compose from 'recompose/compose';

import DeleteWarningDialog from './DeleteWarningDialog';
import DeleteConnector from './Question/DeleteConnector';

const styles = theme => ({
  root: {
    '&:hover': {
      color: 'inherit',
    },
  },
});

const deleteHandler = (deleteQuestion, question, enqueueSnackbar, setSubmitting) => () => {
  setSubmitting(true);
  deleteQuestion({
    variables: {
      id: question.id,
    },
  })
    .then(() => {
      // TODO: Implement 'undo' feature (it needs backend support, like flagging as deleted)
      enqueueSnackbar('Questão excluída', { variant: 'success' });
      setSubmitting(false);
      Router.push('/admin/questoes');
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network available, etc.
      const errorMessage = `Erro ao excluir questão: "${error.message}"`;
      enqueueSnackbar(errorMessage, { variant: 'error' });
      setSubmitting(false);
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

const SafeDeleteIconButton = ({
  classes,
  deleteWarningOpen,
  enqueueSnackbar,
  onPresentSnackbar, // This is here to avoid spredding it with ...otherProps below
  question,
  setDeleteWarningOpen,
  setSubmitting,
  submitting,
  ...otherProps
}) => {
  return (
    <DeleteConnector>
      {deleteQuestion => (
        <React.Fragment>
          <IconButton
            className={classes.root}
            disabled={submitting || deleteWarningOpen}
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
            onSuccess={deleteHandler(deleteQuestion, question, enqueueSnackbar, setSubmitting)}
          />
        </React.Fragment>
      )}
    </DeleteConnector>
  );
};

SafeDeleteIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteWarningOpen: PropTypes.bool.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  setDeleteWarningOpen: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default compose(
  withSnackbar,
  withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
  withState('submitting', 'setSubmitting', false),
  withStyles(styles),
)(SafeDeleteIconButton);
