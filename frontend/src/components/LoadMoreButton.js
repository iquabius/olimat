import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';

const styles = theme => ({
  loadMoreButton: {
    borderStyle: 'dashed',
    marginTop: theme.spacing.unit * 2,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table',
  },
  [theme.breakpoints.up('sm')]: {
    loadMoreButton: {
      width: '49%',
    },
  },
  [theme.breakpoints.up('md')]: {
    loadMoreButton: {
      maxWidth: '32%',
    },
  },
});

const LoadMoreButton = ({ children, classes, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={classes.loadMoreButton}
      color="primary"
      size="large"
      variant="outlined"
    >
      {children}
    </Button>
  );
};

LoadMoreButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(LoadMoreButton);
