import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteConnector from './Question/DeleteConnector';
import Router from 'next/router';

const styles = theme => ({
  root: {
    '&:hover': {
      color: 'inherit',
    },
  },
});

const deleteSubmitHandler = (deleteQuestion, question) => () => {
  deleteQuestion({
    variables: {
      id: question.id,
    },
  })
    .then(response => {
      console.log(`Delete Question Mutation response: `); // eslint-disable-line no-console
      console.log(response); // eslint-disable-line no-console
      Router.push('/admin/questoes');
    })
    .catch(error => {
      // Something went wrong, such as incorrect password, or no network
      // available, etc.
      console.error(error); // eslint-disable-line no-console
    });
};

// TODO: Show a warning dialog for confirmation before deleting
function SafeDeleteIconButton({ classes, question, ...otherProps }) {
  return (
    <DeleteConnector>
      {deleteQuestion => (
        <React.Fragment>
          <IconButton
            className={classes.root}
            onClick={deleteSubmitHandler(deleteQuestion, question)}
            {...otherProps}
          >
            <DeleteIcon />
          </IconButton>
        </React.Fragment>
      )}
    </DeleteConnector>
  );
}

SafeDeleteIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(SafeDeleteIconButton);
