import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, CircularProgress } from '@material-ui/core';
import { compose, withState } from 'recompose';

const styles = theme => ({
  loadMoreButton: {
    borderStyle: 'dashed',
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

const LoadMoreButton = ({ children, classes, loading, onLoadMore, setLoading }) => {
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        // A função fetchMore() do Apollo Client retorna Promise<ApolloQueryResult>
        await onLoadMore();
        setLoading(false);
      }}
      disabled={loading}
      className={classes.loadMoreButton}
      color="primary"
      size="large"
      variant="outlined"
    >
      {loading ? <CircularProgress size={22} /> : children}
    </Button>
  );
};

LoadMoreButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func,
  setLoading: PropTypes.func.isRequired,
};

export default compose(
  withState('loading', 'setLoading', false),
  withStyles(styles),
)(LoadMoreButton);
