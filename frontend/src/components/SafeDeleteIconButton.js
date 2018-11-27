import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import take from 'lodash/take';
import DeleteIcon from '@material-ui/icons/Delete';
import compose from 'recompose/compose';
import { withState } from 'recompose';
import DeleteConnector from './Question/DeleteConnector';
import Router from 'next/router';

const styles = theme => ({
  root: {
    '&:hover': {
      color: 'inherit',
    },
  },
  questionWording: {
    fontStyle: 'italic',
  },
});

const deleteSubmitHandler = (deleteQuestion, question, setSubmitting) => () => {
  setSubmitting(true);
  deleteQuestion({
    variables: {
      id: question.id,
    },
  })
    .then(response => {
      console.log(`Delete Question Mutation response: `); // eslint-disable-line no-console
      console.log(response); // eslint-disable-line no-console
      setSubmitting(false);
      Router.push('/admin/questoes');
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error); // eslint-disable-line no-console
    });
};

const openDeleteWarningDialog = setDeleteWarningOpen => () => setDeleteWarningOpen(true);

const onCancelDelete = (setDeleteWarningOpen, setSubmitting) => () => {
  setSubmitting(false);
  setDeleteWarningOpen(false);
};

/**
 * @param {string} str String to truncate
 */
const truncate = str =>
  take(str.split(' '), 7)
    .join(' ')
    .concat(' [...]');

function SafeDeleteIconButton({
  classes,
  deleteWarningOpen,
  question,
  setDeleteWarningOpen,
  setSubmitting,
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
            onClick={openDeleteWarningDialog(setDeleteWarningOpen)}
            {...otherProps}
          >
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={deleteWarningOpen}
            onClose={onCancelDelete(setDeleteWarningOpen, setSubmitting)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {'Excluir '}
              <span className={classes.questionWording}>{truncate(question.wording)}</span>
              {' ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {'A questão '}
                <span className={classes.questionWording}>{truncate(question.wording)}</span>
                {' será apagada permanentemente.'}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                disabled={submitting}
                onClick={onCancelDelete(setDeleteWarningOpen, setSubmitting)}
                color="secondary"
              >
                Cancelar
              </Button>
              <Button
                disabled={submitting}
                onClick={deleteSubmitHandler(deleteQuestion, question, setSubmitting)}
                color="secondary"
                autoFocus
              >
                Excluir
              </Button>
            </DialogActions>
          </Dialog>
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
  setSubmitting: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default compose(
  withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
  withState('submitting', 'setSubmitting', false),
  withStyles(styles),
)(SafeDeleteIconButton);
