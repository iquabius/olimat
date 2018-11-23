import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, CircularProgress } from '@material-ui/core';

const styles = theme => ({
  loadMoreButton: {
    marginTop: theme.spacing.unit * 2,
    width: '100%',
    // Centraliza o botão verticalmente
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'table',
    // Fixa a altura, porque o CircularProgress aumenta o botão
    height: 40,
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

const LoadMoreButton = ({ children, classes, loadingMore, hasMore, onLoadMore }) => {
  return (
    <Button
      onClick={onLoadMore}
      disabled={loadingMore || !hasMore}
      className={classes.loadMoreButton}
      color="primary"
      size="large"
      variant="outlined"
    >
      {loadingMore ? <CircularProgress size={22} /> : children}
    </Button>
  );
};

LoadMoreButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func,
};

export default withStyles(styles)(LoadMoreButton);
