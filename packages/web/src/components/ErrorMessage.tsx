import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import React from 'react';

const styles = createStyles({
  root: {
    padding: '1.5em',
    fontSize: 14,
    color: 'white',
    backgroundColor: 'red',
  },
});

interface Props extends WithStyles<typeof styles> {
  message: string;
}

const ErrorMessage: React.FunctionComponent<Props> = ({ classes, message }) => (
  <aside className={classes.root}>{message}</aside>
);

export default withStyles(styles)(ErrorMessage);
