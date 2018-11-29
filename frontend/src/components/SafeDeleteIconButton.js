import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from '@material-ui/core';
import take from 'lodash/take';
import DeleteIcon from '@material-ui/icons/Delete';
import compose from 'recompose/compose';
import { withState } from 'recompose';
import DeleteConnector from './Question/DeleteConnector';
import Router from 'next/router';
import DeleteWarningDialog from './DeleteWarningDialog';

const styles = theme => ({
  root: {
    '&:hover': {
      color: 'inherit',
    },
  },
});

const deleteHandler = (deleteQuestion, question, setSubmitting) => () => {
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
            onSuccess={deleteHandler(deleteQuestion, question, setSubmitting)}
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
  setSubmitting: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default compose(
  withState('deleteWarningOpen', 'setDeleteWarningOpen', false),
  withState('submitting', 'setSubmitting', false),
  withStyles(styles),
)(SafeDeleteIconButton);
