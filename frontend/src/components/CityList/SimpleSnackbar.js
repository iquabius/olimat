import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { Snackbar, Button, IconButton, withStyles } from '@material-ui/core';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const SimpleSnackbar = ({ open, onClose, classes }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    ContentProps={{
      'aria-describedby': 'city-deleted-message',
    }}
    message={<span id="city-deleted-message">Cidade excluída</span>}
    action={[
      <Button key="undo" color="secondary" size="small" onClick={onClose}>
        UNDO
      </Button>,
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        className={classes.close}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);
