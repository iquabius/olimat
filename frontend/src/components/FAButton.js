import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  FAButton: {
    position: 'absolute',
    top: -28,
    left: theme.spacing.unit * -6,
  },
  [theme.breakpoints.down(1000 + theme.spacing.unit * 8)]: {
    FAButton: {
      position: 'fixed',
      top: 'auto',
      left: 'auto',
      bottom: 20,
      right: 20,
    },
  },
});

const FAButton = ({ children, classes, onClick, ...rest }) => (
  <Button onClick={onClick} variant="fab" color="secondary" className={classes.FAButton} {...rest}>
    {children}
  </Button>
);

FAButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(FAButton);
