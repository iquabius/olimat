import { createStyles, Fab, Theme, withStyles, WithStyles } from '@material-ui/core';
import React, { MouseEventHandler } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    FAButton: {
      position: 'fixed',
      top: 'auto',
      left: 'auto',
      bottom: 23,
      right: 23,
      // Para o botão ficar por cima das imagens do Card
      zIndex: theme.zIndex.mobileStepper,
    },
  });

interface FAButtonProps extends WithStyles<typeof styles> {
  onClick: MouseEventHandler;
}

const FAButton: React.FunctionComponent<FAButtonProps> = ({
  children,
  classes,
  onClick,
  ...rest
}) => (
  <Fab onClick={onClick} color="secondary" className={classes.FAButton} {...rest}>
    {children}
  </Fab>
);

export default withStyles(styles)(FAButton);
